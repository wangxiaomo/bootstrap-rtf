ngFurry = angular.module 'ngFurry', ['ui.bootstrap', 'angular.filter', 'angular-loading-bar', 'ngSanitize', 'ngMaterial']

ngFurry.filter 'cut', () ->
  return (value, max, tail) ->
    return '' if not value

    max = parseInt max, 10
    return value if not max or value.length <= max

    value = value.substr 0, max
    lastspace = value.lastIndexOf ' '
    if lastspace != -1
      value = value.substr 0, lastspace

    return value + (tail || ' ...')

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
      if not _.isObject data
        data = $.parseJSON data
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
      if not _.isObject data
        data = $.parseJSON data
      deferred.resolve data
    return deferred.promise

  @join = (name, tel, loc, feature, detail) ->
    deferred = $q.defer()
    $http.post FURRY_SOURCE_MAP.api_url + 'join', {
      name: name
      tel: tel
      loc: loc
      feature: feature
      detail: detail
    }
    .success (data) ->
      if not _.isObject data
        data = $.parseJSON data
      deferred.resolve data
    return deferred.promise

  @loadMoreClass = (conditions, p) ->
    deferred = $q.defer()
    $http.post FURRY_SOURCE_MAP.api_url + 'load_more_class', {
      conditions: conditions
      page: p
    }
    .success (data) ->
      if not _.isObject data
        data = $.parseJSON data
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

ngFurry.controller 'JoinController', ($scope, APIEngine) ->
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
        name = $.trim($('input[name=name]').val())
        tel = $.trim($('input[name=tel]').val())
        loc = $.trim($('input[name=loc]').val())
        feature = $.trim($('input[name=feature]').val())
        detail = $.trim($('textarea').val())

        APIEngine.join name, tel, loc, feature, detail
          .then (data) ->
            alert "申请成功"
            $('input, textarea').val('')
            return

ngFurry.controller 'GroupsController', ($scope) ->
  $scope.groups = FURRY_GROUPS

ngFurry.controller 'AwardsController', ($scope) ->
  $scope.awards = FURRY_AWARDS

ngFurry.controller 'TeamsController', ($scope) ->
  $scope.teams = FURRY_TEAMS

  $scope.showDetail = (major) ->
    $scope.majorTeams = FURRY_TEAMS[major]['teams']

    $('.page1').hide()
    $('.page2').show()
    return

ngFurry.controller 'ClassController', ($scope, $compile, APIEngine) ->
  $scope.page = 1
  $scope.choices = []
  $scope.conditions = {}
  $scope.courses = FURRY_COURSES

  $scope.loadMore = (p) ->
    $scope.page = $scope.page + 1
    APIEngine.loadMoreClass $scope.conditions, $scope.page
      .then (data) ->
        if _.isEmpty data
          alert "没有更多了"
          $('.load-more').remove()
          return
        else
          $scope.courses = _.extend $scope.courses, data

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
      renderPageByChoice()

  removeChoice = (choice) ->
    if choice in $scope.choices
      $scope.choices = _.filter($scope.choices, (v) -> choice != v)
      $('.search-token span[data-choice=' + choice + ']').removeClass 'active'
      category = getCurrentCategory()
      $scope.conditions[category] = _.filter($scope.conditions[category], (v) -> choice != v)
      if _.isEmpty $scope.conditions[category]
        delete $scope.conditions[category]
      renderPageByChoice()

  renderPageByChoice = () ->
    $scope.page = 1
    $scope.courses = {}
    APIEngine.loadMoreClass $scope.conditions, $scope.page
      .then (data) ->
        $scope.courses = _.extend $scope.courses, data

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
    return

  $scope.showContentTab = (tab) ->
    $('.bd-banner-menu, .bd-content-tab').removeClass 'active'
    $('.bd-banner-menu[data-content-tab=' + tab + '], .bd-content-tab[data-content-tab=' + tab + ']').addClass 'active'
    return

  $scope.showTarget = (id) ->
    $scope.target = FURRY_COURSES[id]
    $('.page1').hide()
    $('.page2').show()
    return

ngFurry.controller 'MapController', ($scope) ->
  $scope.locs = FURRY_LOCS

  $scope.showPage = (selector) ->
    $('.bd-banner span').removeClass 'active'
    $('.page1, .page2').hide()
    $(selector).show()
    return

  map = new BMap.Map "bmap"
  map.enableScrollWheelZoom true
  map.addControl new BMap.MapTypeControl()
  map.addControl new BMap.NavigationControl()
  map.addControl new BMap.ScaleControl()
  map.addControl new BMap.GeolocationControl()

  map.centerAndZoom "太原", 15

  decoder = new BMap.Geocoder()
  locs = _.map FURRY_LOCS, (v) ->
    return v.address
  for loc in locs
    do (loc) ->
      decoder.getPoint(loc, (p) ->
        if p
          marker = new BMap.Marker p
          marker.setAnimation BMAP_ANIMATION_BOUNCE
          opts =
            width: 200
            height: 50
          infoWindow = new BMap.InfoWindow loc, opts
          marker.addEventListener 'click', () ->
            map.openInfoWindow infoWindow, p
          map.addOverlay marker
      , "太原市")

ngFurry.controller 'EventsController', ($scope) ->
  $scope.events = FURRY_EVENTS

  $scope.showEvent = (id) ->
    $scope.target = FURRY_EVENTS[id]
    $('.page1').hide()
    $('.page2').show()
    return
