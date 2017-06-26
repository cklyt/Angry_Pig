<?php

/* ===============================================================================================
 * AJAX Action handler class
 *
 */
class Server {

    private $debug_mode = TRUE;

	//server construct
    public function __construct() {

        if (!$this->is_ajax()) {

        	return -1;
        }
        if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists

            $action = $_POST["action"];   // Get the action requested, make these up as needed
            switch( $action ) {     //Switch case for value of action
                case "saveEditor"://case for save
                    $response = $this->store();
                   
                    break;
                case "load"://case for load
                    $response =$this->loading();
                    break;
                default:
                    $response = $this->is_error( "Error: 101 - Invalid action." );
                    break;
            }
            
            echo $response;
            return 0;
        }
    }
	//function for store
    private function store() {
    	$savedata = json_encode($_POST);
    	//create a new string for userinput
    	$filename = $_POST["nameinput"];
    	file_put_contents($filename, $savedata);//use that string for the file name
    	return $savedata;
    }
    //function for loading
	private function loading() {
		//get userinput 
		$filename = $_POST["nameinput"];
		$filepath = "../Angrypig/";
		$file = $filepath.$filename;
		//find the inputname file
		$savedata = file_get_contents($file, FILE_USE_INCLUDE_PATH);
		return $savedata;
	}
    private function is_ajax() {

        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    

    /*
     * When we encounter an error the handler should call is error with a message and hand that back
     * as a response to the client
     */
    private function is_error( $error_msg ) {

        // Create a response array (attrib => value) with the origingal post params to start
        $response = $_POST;

        // Add our error message
        $response["error"] = $error_msg;

        // convert the whole response to a JSON string, then add that string
        // as another element to the return message
        //
        // This lets us see the data coming back as a string in the debugger
        if ($this->debug_mode) {

            $response["json"] = json_encode( $response );
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        return json_encode( $response );
    }


    // Here is the actual worker function, this is where you do your server sode processing and
    // then generate a json data packet to return.
    //
 
}


// ========================================================================
//
// MAIN Handler to process POST requests
//
$ajax_post_handler = new Server;
?>