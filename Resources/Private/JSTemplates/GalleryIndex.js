{pageIdVar}
var update_title_url = 'index.php?id=' + pageId + '&tx_yag_pi1[controller]=Ajax&tx_yag_pi1[action]=updateAlbumTitle';
var update_description_url = 'index.php?id=' + pageId + '&tx_yag_pi1[controller]=Ajax&tx_yag_pi1[action]=updateAlbumDescription';

// Tastatureingaben
$(document.documentElement).keyup(function (event) {
    // Eingabe per ESC schlie§en
    if (event.keyCode == 27) {
        $(".tx-yag-album-detail-name").hide();
        $(".tx-yag-album-detail-description").hide();
        $(".tx-yag-gallery-albuminfo").css("z-index","10");
    } 
});


// Handling ajax events
$(function() {
    // Open up a form, if description of album is clicked
    $(".tx-yag-gallery-albumdescription").click(function () {
        $(this).parents("div.tx-yag-gallery-albuminfo").children(".tx-yag-album-detail-description").show();
    });
    $(".tx-yag-gallery-albumdescription").mouseover(function () {
        $(this).addClass("whiteBackgroundEdit");
    });
    $(".tx-yag-gallery-albumdescription").mouseout(function () {
        $(this).removeClass("whiteBackgroundEdit");
    });
    
    
    // Handle cancel-action in album description form
    $(".tx-yag-album-detail-description-cancel").click(function () {
        $(this).parents(".tx-yag-album-detail-description").hide();
    });
    
    // Open up a form for setting name of album
    $(".tx-yag-gallery-albumcaption").click(function () {
          $(this).parents("div.tx-yag-gallery-albuminfo").children(".tx-yag-album-detail-title").show();
          $(this).parents("div.tx-yag-gallery-albuminfo").css("z-index","50");
    });
    $(".tx-yag-gallery-albumcaption").mouseover(function () {
        $(this).addClass("whiteBackgroundEdit");
    });
    $(".tx-yag-gallery-albumcaption").mouseout(function () {
        $(this).removeClass("whiteBackgroundEdit");
    });
    
    
    // Handle cancel action for album title form
    $(".tx-yag-album-detail-title-cancel").click(function () {
        $(this).parents(".tx-yag-album-detail-title").hide();
        $(this).parents("div.tx-yag-gallery-albuminfo").css("z-index","10");
    });
    
    // Handle 'set as key' action for item
    //$("a.photo-detail-linkbar-key").click(function () {
    //    var photo = $(this).parents(".photo-detail");
    //    $.ajax({
    //        url: key_url,
    //        // we use id of photo div and cut off leading "imageUid-"
    //        data: "tx_yag_pi1[itemUid]=" + photo.attr("id").substring(9), 
    //        success: function(feedback) {
    //            if(feedback=='OK') {
    //                $("#messages").html("<div class='message_ok'>Foto als Album Thumbnail festgelegt!</div>");
    //            }else{
    //                $("#messages").html("<div class='message_error'>"+feedback+"</div>");
    //            }
    //        }
    //    });
    //});
    
    // Handle 'update album title' action
    $(".tx-yag-album-detail-title-submit").click(function() {
        var album = $(this).parents(".tx-yag-gallery-albuminfo");
        var albumUid = album.attr("id").substring(9);
        var albumTitle = $(this).siblings("#AlbumTitle").val();
        $.ajax({
            url: update_title_url,
            data: "tx_yag_pi1[albumTitle]=" + albumTitle + "&tx_yag_pi1[albumUid]=" + albumUid,
            success: function(feedback) {
                if (feedback=='OK') {
                    $("#messages").html("<div class='message_ok'>Album-Titel wurde ge&auml;ndert</div>");
                    $("#albumUid-" + albumUid).children(".tx-yag-gallery-albumcaption").html(albumTitle);
                    $("#albumUid-" + albumUid).children("#AlbumName").val(albumTitle);
                } else {
                    $("#messages").html("<div class='message_error'>"+feedback+"</div>");
                }
            }
        });
        // We cannot do this inside ajax call, as 'this' is not defined there!
        $(this).parents(".tx-yag-album-detail-title").hide();
    });
    
    // Handle 'update album description' action
    $(".tx-yag-album-detail-description-submit").click(function() {
        var album = $(this).parents(".tx-yag-gallery-albuminfo");
        var albumUid = album.attr("id").substring(9);
        var albumDescription = $(this).siblings("#AlbumDescription").val();
        $.ajax({
            url: update_description_url,
            data: "tx_yag_pi1[albumDescription]=" + albumDescription + "&tx_yag_pi1[albumUid]=" + albumUid,
            success: function(feedback) {
                if (feedback=='OK') {
                    $("#messages").html("<div class='message_ok'>Album-Beschreibung wurde ge&auml;ndert</div>");
                    $("#albumUid-" + albumUid).children("#AlbumDescription").html(albumDescription);
                } else {
                    $("#messages").html("<div class='message_error'>"+feedback+"</div>");
                }
            }
        });
        // We cannot do this inside ajax call, as 'this' is not defined there!
        $(this).parents(".tx-yag-album-detail-description").hide();
    });
    
});  