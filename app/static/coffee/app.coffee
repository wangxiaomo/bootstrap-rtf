ngFurry = angular.module 'ngFurry', ['ui.bootstrap']

ngFurry.service 'APIEngine', ($http, $q) ->
  @postFeedback = (feedbackType, name, tel, detail) ->
    deferred = $q.defer()
    $http.post FURRY_SOURCE_MAP.api_url + 'feedback', {
        feedbackType: feedbackType
        name: name
        tel: tel
        detail: detail
    }
    .success (data) ->
      deferred.resolve data
    return deferred.promise

  @request = (requestType, name, age, feature, tel, detail) ->
    deferred = $q.defer()
    $http.post FURRY_SOURCE_MAP.api_url + 'request', {
      requestType: requestType
      name: name
      age: age
      feature: feature
      tel: tel
      detail: detail
    }
    .success (data) ->
      deferred.resolve data
    return deferred.promise

  return @
  

ngFurry.controller 'FeedbackController', ($scope, APIEngine) ->
  options = FURRY_SERVER_OPTIONS.feedback_options
  _.map options, (v) ->
    $('select').append "<option value='#{v}'>#{v}</option>"

  $scope.submit = ($e) ->
    $e.preventDefault()
    isInvalid = false
    $.verify {
      prompt: (element, text) ->
        if not isInvalid and not _.isNull(text)
          isInvalid = true
          alert $(element).data('msg')
    }
    $('form').validate ()->
      if not isInvalid
        feedbackType = $('select').val()
        name = $.trim($('input[name=name]').val())
        tel = $.trim($('input[name=tel]').val())
        detail = $.trim($('textarea').val())
        APIEngine.postFeedback feedbackType, name, tel, detail
          .then (data) ->
            alert "反馈成功"
            $('input, textarea').val('')
            return

ngFurry.controller 'RequestController', ($scope, APIEngine) ->
  options = FURRY_SERVER_OPTIONS.request_options
  _.map options, (v) ->
    $('select').append "<option value='#{v}'>#{v}</option>"

  $scope.submit = ($e) ->
    $e.preventDefault()
    isInvalid = false
    $.verify {
      prompt: (element, text) ->
        if not isInvalid and not _.isNull(text)
          isInvalid = true
          alert $(element).data('msg')
    }
    $('form').validate ()->
      if not isInvalid
        requestType = $('select').val()
        name = $.trim($('input[name=name]').val())
        age = $.trim($('input[name=age]').val())
        feature = $.trim($('input[name=feature]').val())
        tel = $.trim($('input[name=tel]').val())
        detail = $.trim($('textarea').val())

        APIEngine.request requestType, name, age, feature, tel, detail
          .then (data) ->
            alert "报名成功"
            $('input, textarea').val('')
            return

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
    options = FURRY_SERVER_OPTIONS[FURRY_SOURCE_MAP.class_categories[category]]
    $('.search-token').html $compile(_.map(options, renderChoice).join(''))($scope)
    $('.search-token').show()

    $('.custom-search span').removeClass 'active'
    $('.custom-search span[data-category=' + category + ']').addClass 'active'
    return

  $scope.select = (choice) ->
    if choice in $scope.choices then removeChoice(choice) else addChoice(choice)
    $('.cnt-search-token').text($scope.choices.join('+'))
    console.log $scope.conditions
    return

  $scope.showContentTab = (tab) ->
    $('.bd-banner-menu, .bd-content-tab').removeClass 'active'
    $('.bd-banner-menu[data-content-tab=' + tab + '], .bd-content-tab[data-content-tab=' + tab + ']').addClass 'active'
    return
