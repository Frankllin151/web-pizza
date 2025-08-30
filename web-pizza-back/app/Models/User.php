<?php 

namespace App\Models; 

class User extends BaseModel {
    protected string $table = "users"; 
    protected array $fillable = [
    "nome" , 
    "email", 
    "senha",
     "tipo" ,
    "token", 
    "reset_token", 
    "reset_token_expira",
     'created_at', 
    'updated_at'
];



    /**
     * Encontra um usuário pelo email
     */
    public function findByEmail(string $email): array|false
    {
        return $this->findOneWhere('email = :email', [':email' => $email]);
    }
    public function findUser(string $email): array|false
    {
        return $this->findWhere("email = :email", [":email" => $email]);
    }

    public function authenticate(string $email, string $password)//: array|false
    {
        $user = $this->findUser($email);
        
       if(!$user){
        return false;
       }

       if(password_verify($password, $user[0]["senha"])){
        return $user;
       }
      return false;
    }
 /**
     * Sobrescreve o método create para adicionar timestamps
     */
    public function create(array $data): int
    {
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['updated_at'] = date('Y-m-d H:i:s');
        
        return parent::create($data);
    }


    public function update(int $id, array $data): bool
    {
        $data['updated_at'] = date('Y-m-d H:i:s');
        
        return parent::update($id, $data);
    }



}