<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?php
set_time_limit ( 3600 );
$file = "http://searchfeed.derbysoft.com/dplatform-searchfeed/hotelsearch.action?d1=2013-5-29&d2=2013-6-5&city=beijing_city&s=ihg-inmyshow&authCode=wk9faw&roomDescription=true";
$file = 'data.xml';
$depth = 0;
$tree = array ();
$tree ['name'] = "root";
$stack [count ( @$stack )] = &$tree;



class xml{
	private $_depth;
	private $_tree;
	private $_stack;
	public function __construct(){
		$this->_depth = 0;
		$this->_tree = array ();
		$this->_tree ['name'] = "root";
		$this->_stack [count ( @$this->_stack )] = &$this->_tree;
	}
	public function startElement($parser, $name, $attrs) {
		$element = array ();
		$element ['name'] = $name;
		foreach ( $attrs as $key => $value ) {
			$element [$key] = $value;
		}
		$last = &$this->_stack [count ( $this->_stack ) - 1];
		$last [count ( $last ) - 1] = &$element;
		$this->_stack [count ( $this->_stack )] = &$element;
		$this->_depth ++;
	}
	public function endElement($parser, $name) {
		array_pop ( $this->_stack );
		$this->_depth --;
	}
	
	public function parserXML($file=''){
		$xml_parser = xml_parser_create ();
		xml_set_element_handler ( $xml_parser, array(&$this,'startElement'), array(&$this,"endElement") );


		if (! ($fp = fopen ( $file, "r" ))) {
			die ( "could not open XML input" );
		}

		while ( $data = fread ( $fp, 4096 ) ) {
			if (! xml_parse ( $xml_parser, $data, feof ( $fp ) )) {
				die ( sprintf ( "XML error: %s at line %d", xml_error_string ( xml_get_error_code ( $xml_parser ) ), xml_get_current_line_number ( $xml_parser ) ) );
			}
		}

		xml_parser_free ( $xml_parser );
		$this->_tree = $this->_stack [0] [0];

		echo "<pre>";
		print_r ( $this->_tree );
		echo "</pre>";
	}
}
$o = new xml();
$o->parserXML($file);

























