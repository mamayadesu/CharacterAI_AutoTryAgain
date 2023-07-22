(function() {
    window.__cai_try_again_interval = null;
    window.__cai_auto_button = null;
    window.__cai_auto_enabled = false;
    window.__cai_auto_next_message = false;
    window.__cai_find_by_inner_text = function(tagname, searchText) {
        var aTags = document.getElementsByTagName(tagname);
        var found = null;

        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == searchText) {
                found = aTags[i];
                break;
            }
        }
        return found;
    };
    window.__cai_try_again_run = function() {
        if (window.__cai_try_again_interval != null) {
            clearInterval(window.__cai_try_again_interval);
            window.__cai_try_again_interval = null;
        }
        setTimeout(function() {
            window.__cai_try_again_interval = setInterval(function() {
                var searchText = "Try Again";
                var found = window.__cai_find_by_inner_text("button", searchText);
                if (found && window.__cai_auto_enabled) {
                    found.click();
                    window.__cai_try_again_run();
                }
            }, 250);
        }, 3000);
    };
    window.__cai_try_again_run();

    window.__cai_update_settings_label = function() {
        window.__cai_auto_button.innerHTML = "<b style='color: green;'>Auto try again: " + (window.__cai_auto_enabled ? "ENABLED" : "<b style='color: red;'>DISABLED</b>") + ", Auto next message: "+ (window.__cai_auto_next_message ? "ENABLED" : "<b style='color: red;'>DISABLED</b>") + "<br>CLICK HERE FOR SETUP</b>";
    };
    
    window.__cai_wait_for_button = setInterval(function() {

        if (window.__cai_auto_next_message) {
            document.getElementsByClassName("swiper-button-next")[0].click();
        }

        var findButton = window.__cai_find_by_inner_text("span", "Remember: Everything Characters say is made up!");
        
        if (findButton == null) {
            return;
        }
        window.__cai_auto_button = findButton;
        window.__cai_auto_enabled = false;
        //clearInterval(window.__cai_wait_for_button);
        
        window.__cai_auto_button.onclick = function(e) {
            window.__cai_auto_enabled = confirm("Do you want to enable Auto 'Try Again' clicker?");

            window.__cai_auto_next_message = confirm("Do you want to enable Auto Next message?");

            window.__cai_update_settings_label();
        };

        window.__cai_update_settings_label();
    }, 1000);
})();
