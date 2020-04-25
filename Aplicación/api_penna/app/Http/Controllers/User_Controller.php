<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\UserModel;


class User_Controller extends Controller{
    function __construct(){
       $this-> user = new UserModel();
    }

    

}
