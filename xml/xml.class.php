<?php
class XML_Parser
{
	var $file = null;
	var $p = null; #the resource xml-parser

	var $__parsing = false;

	function XML_Parser($file = null)
	{
		if (!empty($file)) { $this->file = $file; }

		$this->p = xml_parser_create();
		xml_set_element_handler($this->p, array(&$this, "element_start"));

		register_shutdown_function(array(&$this, "destructor"));
	}

	function element_start($parser, $name, $attrs) { die("here I die while parsing"); }

	function parse_file($file = null)
	{
		$this->__parsing = true;

		if (!empty($file)) { $this->file = $file; }

		if (!file_exists($this->file)) { die("file does not exists: $this->file"); return; }

		if (!($fp = fopen($this->file, "r"))) { die("could not open XML input"); }
		while ($data = fread($fp, 4096))
		{
			if (!xml_parse($this->p, $data, feof($fp)))
			{
				die(
						xml_error_string(xml_get_error_code($this->p)
								. xml_getcurrent_line_number($this->p)));
			}
		}

		$this->__parsing = false;
	}

	function destructor()
	{
		if ($this->__parsing) { xml_parse($this->p, null, 1); }
		xml_parser_free($this->p);
	}
}

#run_me
$o =  new XML_Parser();
$o->parse_file("data.xml");