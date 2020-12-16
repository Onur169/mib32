// ==UserScript==
// @name         klima-streik.org (social)
// @namespace    https://www.klima-streik.org/social
// @version      0.1
// @description  Dieses Script
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

class UserScript extends Uludag {

    constructor() {
        super();
        this.socialMediaTypes = ["facebook", "twitter", "instagram"];
        this.socialMediaImageUrl = 'https://raw.githubusercontent.com/Onur169/mib32/main/userscripts/assets/social-media.png';
    }
    
    supportedSocialMedia() {
        return this.socialMediaTypes;
    }

    isSocialMediaSupported(socialMediaType) {
        return supportedSocialMedia().includes(socialMediaType);
    }
    
    getOffsetForSocialMediaSprite(socialMediaType) {

        let offset = -109;

        if(socialMediaType == "facebook") {
            return 0;
        } else if(socialMediaType == "instagram") {
            return offset;
        } else if(socialMediaType == "twitter") {
            return offset * 2;
        } else {
            return 0;
        }

    }

    getTemplate(socialMediaType) {

        let offset = this.getOffsetForSocialMediaSprite(socialMediaType);

        let template = `
        
            <div id="social-media-box">

                <hr />

                <div id="social-media-logo" style="width: 90px; height: 90px; margin: 1.5rem 0; background: url(${this.socialMediaImageUrl}) ${offset}px; background-size: 307px; background-repeat: no-repeat;"></div>

                <h2>Was geht auf ${super.capitalizeWord(socialMediaType)}?</h2>

                <p>
                    84.006 Personen sind gerade fleißig am Posten! <span>💗</span>
                </p>

                <p>
                    Zur Zeit sind folgende Hashtags auf ${super.capitalizeWord(socialMediaType)} angesagt:
                </p>

                <p>
                    <nav>
                        <a href="#RetteWaldGr%C3%BCneHoffnung" target="_blank">#RetteWaldGr&uuml;neHoffnung</a>
                        <a href="#ArtenvielfaltSch%C3%BCtzenGr%C3%BCneHoffnung" rel="noopener noreferrer" target="_blank">#ArtenvielfaltSch&uuml;tzenGr&uuml;neHoffnung</a>
                    </nav>
                </p>

                <p style="font-size: .9rem">
                    Wenn du wissen möchtest, was auf den anderen Socialmedia-Kanälen so passiert, dann klicke doch <a href="#test">hier!</a>
                </p>

            </div>

        `;

        return template;

    }

    injectBox() {

        let socialMediaTypeByCookie = super.getCookie("social_media_type");
        let socialMediaType = socialMediaTypeByCookie ? socialMediaTypeByCookie.val : this.supportedSocialMedia()[0];

        super.elem("#c510 .frame-container .frame-inner", el => {

            if(el) {

                el[0].insertAdjacentHTML('beforeend', this.getTemplate(socialMediaType));

            }

        });

    }

    init() {

        window.userscript = this;

        this.injectBox();

    }

}

const userScript = new UserScript();
userScript.init();

