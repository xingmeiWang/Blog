'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

            }
        ]
    )

    .config(
        ['$stateProvider', '$urlRouterProvider', "$compileProvider" ,"$controllerProvider",
            function ($stateProvider, $urlRouterProvider, $compileProvider ,$controllerProvider) {
                app.resolveScriptDeps = function(dependencies){
                    return function($q,$rootScope){
                        var deferred = $q.defer();
                        $script(dependencies, function() {
                            // all dependencies have now been loaded by $script.js so resolve the promise
                            $rootScope.$apply(function()
                            {
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }
                }
                $urlRouterProvider
                    /*.otherwise('/app/page1');*/
                    .otherwise('/access/login');
                $stateProvider
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'tpl/login.html?v=201801051554',
                        resolve: {
                            deps: app.resolveScriptDeps([
                                'js/controllers/login.js'
                            ])
                        }
                    })
                    .state('access.signUp', {
                        url: '/signUp',
                        templateUrl: 'tpl/signUp.html?v=201801051554',
                        resolve: {
                            deps: app.resolveScriptDeps([
                                'js/controllers/signUp.js'
                            ])
                        }
                    })
                    .state('app', {
                        url: '/app',
                        templateUrl: 'tpl/app.html?v=201801051554'
                    })
                    .state('app.page1', {
                        url: '/page1/:producerId/:userName',
                        templateUrl: 'tpl/page1.html',
                        resolve: {
                            deps: app.resolveScriptDeps([
                                'js/controllers/page1.js'
                            ])
                        }
                    })
                    .state('app.page2', {
                        url: '/page2',
                        templateUrl: 'tpl/page2.html'
                    })
                    .state('app.page3', {
                        url: '/page3',
                        templateUrl: 'tpl/page3.html'
                    })
                    .state('app.page4', {
                        url: '/page4',
                        templateUrl: 'tpl/page4.html'
                    })

            }
        ]
    );