(function (window) {
    'use strict';
    var Vue = window.Vue;
    Vue.component('item', {
        props: ['currency', 'value'],
        template: '<li>{{currency}} -> {{value}}</li>',
    });
    Vue.component('plainlist', {
        props: {
            items: {
                type: 'Array',
                required: true,
            }
        },
        template:
            '<ul>' +
                '<item v-for="item in items" v-bind:currency="item.currency" v-bind:value="item.value"></item>' + 
            '</ul>',
    });
    Vue.component('tutorial-app', {
        template:
            '<div>' +
                '<h3>Vue / Fetch Tutorial</h3>' +
                '<plainlist v-bind:items="items"></plainlist>' + 
                '<form v-on:submit.prevent>' +
                    '<button v-on:click="submit()">Fetch Data</button>' +
                '</form>' +
            '</div>',
        data: function () {
            var items = [];
            return {
                items: items,
                submit: function () {
                    fetch('http://api.fixer.io/2017-11-02')
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            throw "No Data";
                        })
                    .then(function (obj) {
                        items.length = 0;
                        Object.keys(obj.rates).forEach(function (currency) {
                            items.push({
                                currency: currency,
                                value: obj.rates[currency]
                            });
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }
    });
    new Vue({
        el: '#root',
    });
})(this);
