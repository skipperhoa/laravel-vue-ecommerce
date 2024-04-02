<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ًApplication</title>
        @vite(['resources/css/app.css','resources/scss/feeling.scss'])
    </head>
    <body>
        <div id="app">
            <app />
        </div>
        @vite('resources/js/app.js')
    </body>
</html>
