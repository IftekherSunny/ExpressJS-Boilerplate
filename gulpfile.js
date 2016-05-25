var elixir = require('laravel-elixir');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 */

elixir(function(mix) {

    mix.browserify('main.js');

    mix.sass('main.scss');

});
