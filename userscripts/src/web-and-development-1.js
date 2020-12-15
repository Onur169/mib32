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
        this.socialMediaTypes = ["facebook", "twitter"];
    }

    supportedSocialMedia() {
        return this.socialMediaTypes;
    }

    isSocialMediaSupported(socialMediaType) {
        return supportedSocialMedia().includes(socialMediaType);
    }

    getTemplate(socialMediaType) {

        let template = `
        
            <div id="facebook-box">

                <hr />

                <h2>Was geht auf ${super.capitalizeWord(socialMediaType)}?</h2>

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

    injectBox() {

        let socialMediaTypeByCookie = super.getCookie("social_media_type");
        let socialMediaType = socialMediaTypeByCookie ? socialMediaTypeByCookie : this.supportedSocialMedia()[0];

        super.elem("#c510 .frame-container .frame-inner", el => {

            if(el) {

                el[0].insertAdjacentHTML('beforeend', this.getTemplate(socialMediaType));

            }

        });

    }

    init() {

        this.injectBox();

        window.userscript = this;

    }

}

const userScript = new UserScript();
userScript.init();

