<?php
class User
{
  private $name;

  function set_name( $value )
  {
    $this->name = $value;
  }

  function get_name()
  {
    return $this->name;
  }
}


class Logged
{
  private $obj;

  function __call( $method, $args )
  {
    echo( "$method( ".join( ",", $args )." )\n" );
	return call_user_func_array(array(&$this->obj,$method), $args );
  }

  function __construct( $obj )
  {
    $this->obj = $obj;
  }
}

$c1 = new Logged( new User() );
$c1->set_name( "Jack" );
$name = $c1->get_name();
echo( "name = $name\n" );

