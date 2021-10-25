pragma solidity >=0.8.0;
// SPDX-License-Identifier: Apache 2.0

import "./SafeMath.sol";
import "./InterfaseTRC20.sol";
import "./Admin.sol";

contract Market is Admin{
  using SafeMath for uint256;

  TRC20_Interface CSC_Contract;
  TRC20_Interface OTRO_Contract;

  address public token = 0x038987095f309d3640F51644430dc6C7C4E2E409;

  struct Investor {
    bool registered;
    string correo;
    uint256 balance;
    uint256 gastado;
  }

  struct Item {
    string nombre;
    uint256 valor;
    bool acumulable;
    bool ilimitado;
    uint256 cantidad;
  }
  
  mapping (address => Investor) public investors;
  mapping (address => Item[]) public inventario;
  mapping (uint => Item) public items;

  uint256 index = 10;

  uint256 ingresos;
  uint256 retiros;

  constructor() {

    Item memory teams = Item(
    {
      nombre:"t1-brazil-legendario",
      valor: 1250 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 1000
    });
    items[0] = teams;

    teams = Item(
    {
      nombre:"t2-argentina-legendario",
      valor: 1250 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 1000
    });
    items[1] = teams;

    teams = Item(
    {
      nombre:"t3-alemania-legendario",
      valor: 1250 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 1000
    });
    items[2] = teams;

    teams = Item(
    {
      nombre:"t4-japon-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 500
    });
    items[3] = teams;

    teams = Item(
    {
      nombre:"t5-colombia-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 500
    });
    items[4] = teams;

    teams = Item(
    {
      nombre:"t6-mexico-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 1500
    });
    items[5] = teams;

    teams = Item(
    {
      nombre:"t7-croacia-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 750
    });
    items[6] = teams;

    teams = Item(
    {
      nombre:"t8-EU-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 500
    });
    items[7] = teams;

    teams = Item(
    {
      nombre:"t9-portugal-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 750
    });
    items[8] = teams;
      
    teams = Item(
    {
      nombre:"t10-esp-epico",
      valor: 875 * 10**18,
      acumulable: false,
      ilimitado: false,
      cantidad: 500
    });
    items[9] = teams;
      
    CSC_Contract = TRC20_Interface(token);

  }

  function registro(string memory _correo) public{
    
    Investor storage usuario = investors[msg.sender];

    if(usuario.registered)revert();
   
    usuario.registered = true;
    usuario.correo = _correo;

  }

  function updateRegistro(string memory _correo) public{
    
    Investor storage usuario = investors[msg.sender];

    if(!usuario.registered)revert();
   
    usuario.correo = _correo;

  }

  function updateRegistroMaster(address _user, string memory _correo) public onlyOwner{
    
    Investor storage usuario = investors[_user];

    if(!usuario.registered)revert();
   
    usuario.correo = _correo;

  }

  function viewDuplicatedItem(string memory _name) private view returns(bool){

    bool duplicado = false;

     Item[] memory myInventario = inventario[msg.sender];

     for (uint256 i = 0; i < myInventario.length; i++) {

       if(keccak256(abi.encodePacked(myInventario[i].nombre)) == keccak256(abi.encodePacked(_name))){
         duplicado = true;
         break;
       }
       
     }

     return duplicado;

     

  }
  
  function buyItem(uint256 _id) public returns(bool){

    Investor memory usuario = investors[msg.sender];
    Item memory item = items[_id];

    if (!item.acumulable){
      if (viewDuplicatedItem(item.nombre))revert();
    }
    
    if ( !usuario.registered)revert();
    if ( !item.ilimitado){
      if(item.cantidad == 0)revert();
    }
    if( CSC_Contract.allowance(msg.sender, address(this)) < item.valor )revert();
    if(!CSC_Contract.transferFrom(msg.sender, address(this), item.valor))revert();
    
    if ( !item.ilimitado){
      items[_id].cantidad -= 1;
    }
    
    inventario[msg.sender].push(item);
    ingresos += item.valor;

    return true;
      
    
  }

   function buyCoins(uint256 _value) public returns(bool){

    Investor storage usuario = investors[msg.sender];

    if ( !usuario.registered) revert();

    if( CSC_Contract.allowance(msg.sender, address(this)) < _value )revert();
    if(!CSC_Contract.transferFrom(msg.sender, address(this), _value))revert();
  
    usuario.balance += _value;
    ingresos += _value;

    return true;
    
  }

  function sellCoins(uint256 _value) public returns (bool) {
      Investor storage usuario = investors[msg.sender];

      if (!usuario.registered) revert();
      if (usuario.gastado+_value > usuario.balance)revert();

      if (CSC_Contract.balanceOf(address(this)) < _value)
          revert();
      if (!CSC_Contract.transfer(msg.sender,  _value))
          revert();

      usuario.gastado += _value;
      retiros += _value;

      return true;
    }

  function gastarCoins(uint256 _value) public returns(bool){

    Investor storage usuario = investors[msg.sender];

    if ( !usuario.registered && usuario.gastado.add(_value) > usuario.balance) revert();
      
    usuario.gastado += _value;

    return true;
    
  }

  function addItem(string memory _nombre, uint256 _value, bool _acumulable, bool _ilimitado, uint256 _cantidad) public onlyAdmin returns(bool){

    Item memory teams = Item(
    {
      nombre: _nombre,
      valor: _value,
      acumulable: _acumulable,
      ilimitado: _ilimitado,
      cantidad: _cantidad
    });
    items[index] = teams;
    index++;

    return true;
    
  }

  function editItem(uint256 _id, string memory _nombre, uint256 _value, bool _acumulable, bool _ilimitado, uint256 _cantidad) public onlyAdmin returns(bool){

    Item memory teams = Item(
    {
      nombre: _nombre,
      valor: _value,
      acumulable: _acumulable,
      ilimitado: _ilimitado,
      cantidad: _cantidad
    });
    items[_id] = teams;

    return true;
    
  }

  function largoInventario(address _user) public view returns(uint256){

    Item[] memory invent = inventario[_user];

    return invent.length;
      
  }

  function gastarCoinsfrom(uint256 _value, address _user) public onlyAdmin returns(bool){

    Investor storage usuario = investors[_user];

    if ( !usuario.registered && usuario.gastado.add(_value) > usuario.balance) revert();
      
    usuario.gastado += _value;

    return true;
    
  }

  function asignarCoinsTo(uint256 _value, address _user) public onlyAdmin returns(bool){

    Investor storage usuario = investors[_user];

    if ( !usuario.registered && usuario.gastado.add(_value) > usuario.balance) revert();
      
    usuario.balance += _value;

    return true;
      
    
  }
  
  function ChangePrincipalToken(address _tokenERC20) public onlyOwner returns (bool){

    OTRO_Contract = TRC20_Interface(_tokenERC20);
    token = _tokenERC20;

    return true;

  }

  function ChangeTokenOTRO(address _tokenERC20) public onlyOwner returns (bool){

    OTRO_Contract = TRC20_Interface(_tokenERC20);

    return true;

  }

  function redimTokenPrincipal01() public onlyOwner returns (uint256){

    if ( CSC_Contract.balanceOf(address(this)) <= 0)revert();

    uint256 valor = CSC_Contract.balanceOf(address(this));

    CSC_Contract.transfer(owner, valor);

    return valor;
  }

  function redimTokenPrincipal02(uint256 _value) public onlyOwner returns (uint256) {

    if ( CSC_Contract.balanceOf(address(this)) < _value)revert();

    CSC_Contract.transfer(owner, _value);

    return _value;

  }

  function redimOTRO() public onlyOwner returns (uint256){

    if ( OTRO_Contract.balanceOf(address(this)) <= 0)revert();

    uint256 valor = OTRO_Contract.balanceOf(address(this));

    OTRO_Contract.transfer(owner, valor);

    return valor;
  }

  function redimETH() public onlyOwner returns (uint256){

    if ( address(this).balance <= 0)revert();

    owner.transfer(address(this).balance);

    return address(this).balance;

  }

}