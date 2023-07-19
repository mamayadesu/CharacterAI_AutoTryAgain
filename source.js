(function() {
    window.__cai_try_again_interval = null;
    window.__cai_auto_button = null;
    window.__cai_auto_enabled = true;
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
    
    window.__cai_wait_for_button = setInterval(function() {
        window.__cai_auto_button = window.__cai_find_by_inner_text("span", "Remember: Everything Characters say is made up!");
        
        if (window.__cai_auto_button == null) {
            return;
        }
        clearInterval(window.__cai_wait_for_button);
        
        window.__cai_auto_button.onclick = function(e) {
            window.__cai_auto_enabled = !window.__cai_auto_enabled;
            if (window.__cai_auto_enabled) {
                window.__cai_auto_button.innerHTML = "<b style='color: green;'>AUTO 'TRY AGAIN' IS ENABLED. CLICK HERE TO DISABLE IT</b>";
            } else {
                window.__cai_auto_button.innerHTML = "AUTO 'TRY AGAIN' IS DISABLED. CLICK HERE TO DISABLE IT";
            }
        };
        
        window.__cai_auto_button.click();
    }, 1);
})();
