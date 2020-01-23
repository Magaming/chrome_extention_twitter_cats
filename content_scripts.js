const crys = [
    "にゃ",
    "にゃ～",
    "にゃッ",
    "にゃお",
    "にゃ～ん",
    "にゃ～～ん",
    "にゃ～～～ん",
]

const imageCount = 37;

function imgReplace () {

    const images = document.getElementsByClassName("css-1dbjc4n r-1niwhzg r-vvn4in r-u6sd8q r-4gszlv r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw")
    const tweets = document.getElementsByClassName("css-901oao r-hkyrab r-gwet1z r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0");
    const hashTags = document.getElementsByClassName("css-4rbku5 css-18t94o4 css-901oao css-16my406 r-1n1174f r-1loqt21 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0")

    for (var i = 0; i < images.length; i++) {
        const num = ('00' + (Math.floor(Math.random() * imageCount) + 1)).slice( -3 )
        const fileName =`cat${num}.jpg`;
        const imageUrl = chrome.extension.getURL(`images/${fileName}`);
        images[i].style = `background-image: url(${imageUrl})`
    }

    for (var i = 0; i < tweets.length; i++) {
        const cry = crys[Math.floor(Math.random() * crys.length)]
        tweets[i].innerHTML = cry
    }

    for (var i = 0; i < hashTags.length; i++) {
        const cry = crys[Math.floor(Math.random() * crys.length)]
        hashTags[i].innerHTML = ` #${cry}`
    }

}

window.onload = () => {

  function initialObserver() {

    const section = document.getElementsByTagName("section")[0];

    if(!section){
      setTimeout(initialObserver, 500);
      return;
    }
  
    // オブザーバの設定
    const config = {
      characterData: true,
      childList: true,
      subtree: true
    };
  
    var observer = new MutationObserver(mutations => {
  
      observer.disconnect();
      imgReplace();
      observer.observe(section, config);
    });
  
    // 対象ノードとオブザーバの設定を渡す
    observer.observe(section, config);
  }

  initialObserver();

}
