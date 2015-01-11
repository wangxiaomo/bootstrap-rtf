ngFurry = angular.module 'ngFurry', ['ui.bootstrap']

ngFurry.controller 'TeamController', ($scope) ->
  $scope.showDetail = (id) ->
    $('.page1').hide()
    $('.page2').show()
    return
