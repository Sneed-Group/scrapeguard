// Polyfill for Array methods

function getCurrentDocumentName() {
    // Get the current URL
    const currentUrl = window.location.href;

    // Create a URL object to easily access parts of the URL
    const url = new URL(currentUrl);

    // Get the pathname from the URL
    const pathname = url.pathname;

    // Extract the filename from the pathname
    const filename = pathname.split('/').pop();

    return filename;
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Polyfill for Array.some
if (!Array.prototype.some) {
    Array.prototype.some = function(callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}

// Polyfill for String methods
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// Polyfill for atob
if (typeof atob === 'undefined') {
    function atob(str) {
        return decodeURIComponent(escape(window.btoa(unescape(encodeURIComponent(str)))));
    }
}

// Polyfill for btoa
if (typeof btoa === 'undefined') {
    function btoa(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
}

var words = [
    "serendipity", "ephemeral", "luminous", "ethereal", "cascade", "whisper", "murmur",
    "twilight", "dawn", "dusk", "starlight", "moonbeam", "sunset", "rainbow", "cloud",
    "breeze", "gale", "storm", "thunder", "lightning", "rain", "snow", "frost", "mist",
    "ocean", "river", "stream", "lake", "pond", "wave", "tide", "shore", "beach", "sand",
    "mountain", "valley", "forest", "garden", "meadow", "field", "desert", "canyon",
    "flower", "tree", "leaf", "branch", "root", "seed", "blossom", "petal", "thorn",
    "bird", "wing", "feather", "nest", "egg", "song", "flight", "soar", "glide",
    "time", "moment", "hour", "day", "night", "week", "month", "year", "season",
    "dream", "hope", "wish", "desire", "joy", "peace", "love", "hate", "fear",
    "light", "dark", "shadow", "glow", "shine", "sparkle", "glimmer", "flicker",
    "sound", "echo", "silence", "noise", "music", "melody", "rhythm", "harmony",
    "color", "hue", "shade", "tint", "paint", "brush", "canvas", "palette", "rainbow"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomWords(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push(words[getRandomInt(0, words.length - 1)]);
    }
    return result;
}

function createParagraph() {
    var paragraphCount = getRandomInt(1, 3);
    var paragraphs = [];
    
    for (var p = 0; p < paragraphCount; p++) {
        var sentenceCount = getRandomInt(4, 6);
        var paragraph = [];
        
        for (var s = 0; s < sentenceCount; s++) {
            var wordCount = getRandomInt(5, 12);
            var words = getRandomWords(wordCount);
            paragraph.push(words.join(' ') + '.');
        }
        
        paragraphs.push(paragraph.join(' '));
    }
    
    return paragraphs;
}

function createHeading() {
    var wordCount = getRandomInt(2, 6);
    var words = getRandomWords(wordCount);
    var heading = words.join(' ');
    document.title = heading;
    return heading;
}

function addNextLink() {
    let nextLinkURL = ""
    if (getCurrentDocumentName() === 'bc2.html') {
        nextLinkURL = 'bc3.html';
    } else if (getCurrentDocumentName() === 'bc3.html') {
        nextLinkURL = 'bc4.html';
    } else if (getCurrentDocumentName() === 'bc4.html') {
        nextLinkURL = 'bc5.html';
    } else if (getCurrentDocumentName() === 'bc5.html') {
        nextLinkURL = 'bc6.html';
    } else if (getCurrentDocumentName() === 'bc6.html') {
        nextLinkURL = 'bc7.html';
    } else if (getCurrentDocumentName() === 'bc7.html') {
        nextLinkURL = 'index.html';
    }
    document.body.innerhtml = `${document.body.innerHTML} 
    <a href="${nextLinkURL}" class="next-link">Next</a>` 
}
function generateContent() {
    var contentDiv = document.getElementById('content');
    var headingDiv = document.getElementById('heading');
    var nextLink = document.querySelector('.next-link');
    var paragraphs = createParagraph();
    var currentParagraphIndex = 0;
    var currentWordIndex = 0;
    
    headingDiv.textContent = createHeading();
    headingDiv.className += ' visible';
    
    function addWords() {
        if (currentParagraphIndex < paragraphs.length) {
            var paragraph = paragraphs[currentParagraphIndex];
            var words = paragraph.split(' ');
            
            if (currentWordIndex < words.length) {
                var wordsToAdd = words.slice(currentWordIndex, currentWordIndex + 3);
                var span = document.createElement('span');
                span.textContent = wordsToAdd.join(' ') + ' ';
                contentDiv.appendChild(span);
                contentDiv.className += ' visible';
                
                currentWordIndex += 3;
                setTimeout(addWords, 3000);
            } else {
                currentParagraphIndex++;
                currentWordIndex = 0;
                if (currentParagraphIndex < paragraphs.length) {
                    contentDiv.appendChild(document.createElement('br'));
                    setTimeout(addWords, 3000);
                } else {
                    addNextLink();
                }
            }
        } else {
            addNextLink();
        }
    }
    
    addWords();
}

// Cross-browser event listener
if (window.addEventListener) {
    window.addEventListener('load', generateContent);
} else if (window.attachEvent) {
    window.attachEvent('onload', generateContent);
} else {
    window.onload = generateContent;
}