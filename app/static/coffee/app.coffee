ngFurry = angular.module 'ngFurry', ['ui.bootstrap']

ngFurry.controller 'TeamController', ($scope) ->
  $scope.showDetail = (id) ->
    $('.page1').hide()
    $('.page2').show()
    return

ngFurry.controller 'ClassController', ($scope, $compile) ->
  $scope.choices = []
  $scope.conditions = {}

  renderChoice = (choice) ->
    if choice in $scope.choices
      "<span class='active' data-choice='#{choice}' data-ng-click=\"select('#{choice}')\">#{choice}</span>"
    else
      "<span data-choice='#{choice}' data-ng-click=\"select('#{choice}')\">#{choice}</span>"

  getCurrentCategory = () ->
    $('.custom-search span.active').data('category')

  addChoice = (choice) ->
    if choice not in $scope.choices
      $scope.choices.push(choice)
      $('.search-token span[data-choice=' + choice + ']').addClass 'active'
      category = getCurrentCategory()
      if $scope.conditions[category]
        $scope.conditions[category].push(choice)
      else
        $scope.conditions[category] = [choice]

  removeChoice = (choice) ->
    if choice in $scope.choices
      $scope.choices = _.filter($scope.choices, (v) -> choice != v)
      $('.search-token span[data-choice=' + choice + ']').removeClass 'active'
      category = getCurrentCategory()
      $scope.conditions[category] = _.filter($scope.conditions[category], (v) -> choice != v)

  $scope.showOptions = (category) ->
    options = FURRY_SOURCE_MAP.class_categories[category]
    $('.search-token').html $compile(_.map(options, renderChoice).join(''))($scope)

    $('.custom-search span').removeClass 'active'
    $('.custom-search span[data-category=' + category + ']').addClass 'active'
    return

  $scope.select = (choice) ->
    if choice in $scope.choices then removeChoice(choice) else addChoice(choice)
    $('.cnt-search-token').text($scope.choices.join('+'))
    console.log $scope.conditions
    return