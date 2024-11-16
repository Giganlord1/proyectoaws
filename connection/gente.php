<?php
class animal{
    public $id;
    public $username;
    public $password;
    public $telefono;
    public $puesto;
    public $fechadecontratacion;
    
}
function get_All(){
    $listauser = [];
    $path = $_SERVER['DOCUMETN_ROOT'];
    include($path."/PROYECTOAWS/connection/db.php");
    $query = "SELECT id, username, password, telefono, puesto, fechadecontratacion from aws.users";
    $result = $connection->query($sql);
    if($result->num_rows >0){
        while($rows = $result->fetch_assoc()){
            $object = new Animal();
            $object->id = $rows["id"];
            $object->username = $rows["username"];
            $object->password = $rows["password"];
            $object->telefono = $rows["telefono"];
            $object->puesto = $rows["puesto"];
            $object->fechadecontratacion = $rows["fechadecontratacion"];
            $listauser[]= $object;

        }
    }
    return (array)$listauser;
    
}

?>