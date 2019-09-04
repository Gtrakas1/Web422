/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: George Trakas Student ID: 108459173 Date: Friday,September 14th, 2018
*
*
********************************************************************************/ 

$(function () {
    $("#data").text("Jquery is working");


    $("#teams-menu").on("click", function () {
        event.preventDefault();

        $.ajax({
            url: "https://calm-refuge-91872.herokuapp.com/teams",
            type: "GET",
            contentType: "application/json"

        })
            .done(function (data) {
                console.log("here");
                $("#data").empty();
                $("#data").append("<h3> Teams </h3>");
                $("#data").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });

    });

    $("#employees-menu").on("click", function () {
        event.preventDefault();
        $.ajax({
            url: "https://calm-refuge-91872.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"

        })
            .done(function (data) {
                $("#data").empty();
                $("#data").append("<h3> Employees </h3>");
                $("#data").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });

    });

    $("#projects-menu").on("click", function () {
        event.preventDefault();
        $.ajax({
            url: "https://calm-refuge-91872.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"

        })
            .done(function (data) {
                $("#data").empty();
                $("#data").append("<h3> Projects </h3>");
                $("#data").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });
    });

    $("#positions-menu").on("click", function () {
        event.preventDefault();
        $.ajax({
            url: "https://calm-refuge-91872.herokuapp.com/positions",
            type: "GET",
            contentType: "application/json"

        })
            .done(function (data) {
                $("#data").empty();
                $("#data").append("<h3> Positions </h3>");
                $("#data").append(JSON.stringify(data));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });
    });
})
