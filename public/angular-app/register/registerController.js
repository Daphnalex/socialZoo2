angular.module('SocialZoo').controller('RegisterController', RegisterController);

function RegisterController($http, $location, usersFactory) {
  var vm = this;
  vm.isSubmitted = false;

  vm.register = function() {
    var user = {
      nameZoo: vm.nameZoo,
      password: vm.password
    };
    //console.log(user);
    if(!vm.nameZoo || !vm.password) {
      vm.error = 'Please add a username and a password.';
    } else {
        console.log('coucou');
          if(vm.myForm.$valid){
            console.log(user);
            usersFactory.userAddOne(user).then(function(response){

              console.log('réponse '+response);
              if(response.status === 201){
                console.log("j'entre");
                $location.path('/authentification');
              } else {
                console.log('erreur');
              }
            }).catch(function(error){
              console.log(error);
            });
          } else {
            vm.isSubmitted = true;
          }
      }
    }
  };
