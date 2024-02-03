// ==UserScript==
// @name Autofarm with ranndom interval
// @namespace https://ts4.tribalwarsmasters.net/game.php?*screen=am_farm*
// @namespace https://rus1.voyna-plemyon.ru/game.php?*screen=am_farm*
// @namespace https://ros1.triburile.ro/game.php?*screen=am_farm*
// @namespace https://uks1.tribalwars.co.uk/game.php?*screen=am_farm*
// @match https://ts1.tribalwarsmasters.net/game.php?*screen=am_farm*
// @match https://*.tribalwars.net/game.php?*&screen=am_farm*
// @match https://rus1.voyna-plemyon.ru/game.php?*screen=am_farm*
// @match https://ru36.voyna-plemyon.ru/game.php?*screen=am_farm*
// @match https://ts4.tribalwarsmasters.net/game.php?*screen=am_farm*
// @match https://ros1.triburile.ro/game.php?*screen=am_farm*
// @match https://uks1.tribalwars.co.uk/game.php?*screen=am_farm*
// @match https://*.plemiona.pl/game.php?*screen=am_farm*
// @match https://*.divokekmeny.cz/game.php?*screen=am_farm*
// @match https://nls1.tribalwars.nl/game.php?*screen=am_farm*
// @match https://frs1.guerretribale.fr/game.php?*screen=am_farm*
// @match https://brs1.tribalwars.com.br/game.php?*&screen=am_farm*
// @match https://ess1.guerrastribales.es/game.php?*&screen=am_farm*
// @match https://*.tribalwars.com.br/game.php?*&screen=am_farm*
// @match https://*.die-staemme.de/game.php?*&screen=am_farm*
// @match        https://*screen=am_farm*
// @match      https://*screen=am_farm*
// @match https://*.tribalwars.net/game.php?village=*&screen=am_farm*
// @match https://its1.tribals.it/game.php?village=*&screen=am_farm*


// @grant none
// ==/UserScript==

function random(superior,inferior) {
    let numPosibilidades = superior - inferior;
    let aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat);
}

function verifyRecaptcha(){
    if($(".g-recaptcha").length){
        console.log("recaptcha");
        $("div.recaptcha-checkbox-checkmark").click();
    }
}

setTimeout(verifyRecaptcha, random(2000,10000));

function getPage(i, pages) {
    var sitter = "";
    if (window.top.game_data.player.sitter != "0") {
        sitter = "t=" + window.top.game_data.player.id + "&";
    }
    var link = ["https://" + window.location.host + "/game.php?" + sitter + "village=", "&screen=am_farm"];
    if (i < pages) {
        //         changeHeader(filter_41 + " " + (i + 1) + "/" + pages + " <img src='graphic/throbber.gif' height='24' width='24'></img>");
        var url = link[0] + window.top.game_data.village.id + "&order=distance&dir=asc&Farm_page=" + i + "&screen=am_farm";
        window.top.$.ajax({
            type: 'GET', url: url, dataType: "html", error: function (xhr, statusText, error) {
                console.log("Get page failed with error: " + error);
            }, success: function (data) {
                window.top.$('#plunder_list tr', data).slice(2).each(function () {
                    window.top.$('#plunder_list tr:last').after("<tr>" + window.top.$(this).html() + "</tr>");
                });
                setTimeout(function () {
                    getPage(i + 1, pages);
                }, 1);
            }
        });
    } else {
    }
}

getPage(1, 1);

setTimeout(function(){

    var FARM_TITLE = "Farm",
        STOP_TITLE = "Stop",
        CHEAT_MODE = " cheat",
        autoPause = false,
        //     cheat = sessionStorage.cheat === undefined ? false : true,
        cheat = true,
        userPause = false,
//         userPause = sessionStorage.pause === undefined ? false : true,
        s1;
    document.onkeydown = checkPause;

    function startFarm(icon) {
        var i = sessionStorage.index === undefined ? 0 : sessionStorage.index,
            tableFarm = $("#plunder_list").find(".farm_icon_" + icon);
        s1 = setInterval(function() {
            if (!autoPause && !userPause)
            {
                var button = tableFarm.eq(i++);
                button.trigger('click');
                if (button.css("opacity") == "0.5" || checkUnit())
                {
                    sessionStorage.index = --i;
                    reloadPage();
                }
                else if (i >= tableFarm.length)
                {
                    delete sessionStorage.index;
                    reloadPage();
                }
                else
                    button.closest("tr").remove();
            }
        }, Math.floor(Math.random() * (230 - 200 + 1)) + 230);
    }

    function checkUnit() {
        var noUnit = $(".error");
        if (noUnit.length && noUnit.text().indexOf("5") == -1)
            return true;
        else
            return false;
    }

    function checkPause(e)
    {
        switch(e.keyCode)
        {
            case 70:
                if (!userPause)
                {
                    isWorking(true);
                    sessionStorage.pause = userPause = true;
                }
                else
                {
                    userPause = false;
                    isWorking(false);
                    delete sessionStorage.pause;
                }
                break;
            case 67:
                if (sessionStorage.cheat)
                {
                    cheat = false;
                    delete sessionStorage.cheat;
                }
                else
                    sessionStorage.cheat = cheat = true;
                updateTitle();
                break;
        }
    }

    function isWorking(status)
    {
        autoPause = status;
        updateTitle();
    }

    function reloadPage() {
        if (!userPause)
        {
            var changeVillage = $("#village_switch_right");
            clearInterval(s1);
            if (changeVillage.length)
                location.href = changeVillage.attr("href");
            else
                location.reload(true);
        }
    }

    $(window).blur(function() {
        if (!userPause && !cheat)
            isWorking(true);
    });

    $(window).focus(function() {
        if (!userPause && !cheat)
            isWorking(false);
    });

    function createOptionWindow() {
    // Create a simple HTML window with radio buttons
    var optionWindow = `
        <div id="optionWindow" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: white; border: 1px solid #ccc; z-index: 9999;">
            <label><input type="radio" name="farmOption" value="a" checked> Option A</label><br>
            <label><input type="radio" name="farmOption" value="b"> Option B</label><br>
            <label><input type="radio" name="farmOption" value="c"> Option C</label><br>
            <button onclick="closeOptionWindow()">Close</button>
        </div>
    `;

    // Append the window to the body
    $('body').append(optionWindow);
}

    function closeOptionWindow() {
    // Close the option window
    $('#optionWindow').remove();
}

    

    function execute() {
        createOptionWindow();
        if(!document.hasFocus() && !cheat)
            isWorking(true);

        updateTitle();

        setTimeout(function() {
            var selectedOption = $("input[name='farmOption']:checked").val();
            startFarm(selectedOption);
            closeOptionWindow();
        }, 100);
    }

    function updateTitle() {
        if (autoPause || userPause)
            document.title = STOP_TITLE;
        else
            document.title = FARM_TITLE;

        if (cheat)
            document.title += CHEAT_MODE;
    }

    execute();

}, random(500, 700));
