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
    bool ilimitado;
    uint256 cantidad;
  }
  
  mapping (address => Investor) public investors;
  mapping (address => Item[]) public inventario;
  mapping (uint => Item) public items;

  constructor() {

    Item memory teams = Item(
    {
      nombre:"t1-brazil-legendario",
      valor: 1250 * 10**18,
      ilimitado: false,
      cantidad: 1000
    });
    items[0] = teams;

    teams = Item(
    {
      nombre:"t2-argentina-legendario",
      valor: 1250 * 10**18,
      ilimitado: false,
      cantidad: 10
    });
    items[1] = teams;

    teams = Item(
    {
      nombre:"t3-alemania-legendario",
      valor: 1250 * 10**18,
      ilimitado: false,
      cantidad: 1
    });
    items[2] = teams;
      
    CSC_Contract = TRC20_Interface(token);

  }

  function registro(string memory _correo) public{
    
    Investor storage usuario = investors[msg.sender];

    if(usuario.registered)revert();
   
    usuario.registered = true;
    usuario.correo = _correo;

  }
  
  function buyItem(uint256 _id) public returns(bool){

    Investor memory usuario = investors[msg.sender];
    Item memory item = items[_id];

    if ( !usuario.registered)revert();
    if ( !item.ilimitado){
      if(item.cantidad < 1)revert();
    }
    if( CSC_Contract.allowance(msg.sender, address(this)) < item.valor )revert();
    if(!CSC_Contract.transferFrom(msg.sender, address(this), item.valor))revert();
      
    inventario[msg.sender].push(item);

    return true;
      
    
  }

   function buyCoins(uint256 _value) public returns(bool){

    Investor storage usuario = investors[msg.sender];

    if ( usuario.registered) {

        if( CSC_Contract.allowance(msg.sender, address(this)) < _value )revert();
        if(!CSC_Contract.transferFrom(msg.sender, address(this), _value))revert();
      
        usuario.balance += _value;

        return true;
      
    } else {
        revert();
    }
    
  }

  function gastarCoins(uint256 _value) public returns(bool){

    Investor storage usuario = investors[msg.sender];

    if ( usuario.registered && usuario.gastado.add(_value) <= usuario.balance) {
      
        usuario.gastado += _value;

        return true;
      
    } else {
        revert();
    }
    
  }

  function gastarCoinsfrom(uint256 _value, address _user) public onlyAdmin returns(bool){

    Investor storage usuario = investors[_user];

    if ( usuario.registered && usuario.gastado.add(_value) <= usuario.balance) {
      
        usuario.gastado += _value;

        return true;
      
    } else {
        revert();
    }
    
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