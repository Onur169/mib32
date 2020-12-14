// ==UserScript==
// @name         klima-streik.org (social)
// @namespace    https://www.klima-streik.org/social
// @version      0.1
// @description  Dieses Script
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// ==/UserScript==

class UserScript extends Uludag {

    constructor() {
        super();
    }

    getTemplate() {

        let template = `
        
            <div id="facebook-box">

                <hr />

                <h2>Was geht bei Social Media?</h2>
                <p>
                  
                </p>
                <p>
                    84.006 Personen sind gerade fleißig am Posten! <span>💗</span>
                </p>
                <p>
                    Zur Zeit sind folgende Hashtags auf Facebook angesagt:
                </p>
                <p>
                    <nav>
                        <a href="#RetteWaldGr%C3%BCneHoffnung" target="_blank">#RetteWaldGr&uuml;neHoffnung</a>
                        <a href="#ArtenvielfaltSch%C3%BCtzenGr%C3%BCneHoffnung" rel="noopener noreferrer" target="_blank">#ArtenvielfaltSch&uuml;tzenGr&uuml;neHoffnung</a>
                    </nav>
                </p>
            </div>

        `;

        return template;

    }

    injectFacebookBox() {

        super.elem("#c510 .frame-container .frame-inner", el => {

            if(el) {

                el[0].insertAdjacentHTML('beforeend', this.getTemplate());

            }

        });

    }

    init() {

        this.injectFacebookBox();

    }

}

const userScript = new UserScript();
userScript.init();

