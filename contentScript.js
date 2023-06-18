function extractTextWithNewlines(element) {
  let lines = [];
  for (let node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      lines.push(node.nodeValue);
    } else if (node.tagName === "BR" || node.tagName === "P") {
      lines.push("\n");
    }
  }
  return lines.join("");
}

window.onload = function () {
  if (window.location.host === "prompttoolbox.com") {
    // Check if the page has the element with id 'kt_clipboardicon_0'
    let clipButton = document.getElementById("kt_clipboardicon_0");
    if (clipButton) {
      // Extract the text from the card title
      let text = extractTextWithNewlines(document.querySelector(".card-title"));

      // Create a link element
      let linkButton = document.createElement("button");
      linkButton.className = "btn btn-icon btn-sm btn-light";
      linkButton.innerHTML =
        '<span class="svg-icon svg-icon-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4451171,17.7910156 C21.4451171,16.9707031 21.6208984,13.7333984 19.0671874,11.1650391 C17.3484374,9.43652344 14.7761718,9.13671875 11.6999999,9 L11.6999999,4.69307548 C11.6999999,4.27886191 11.3642135,3.94307548 10.9499999,3.94307548 C10.7636897,3.94307548 10.584049,4.01242035 10.4460626,4.13760526 L3.30599678,10.6152626 C2.99921905,10.8935795 2.976147,11.3678924 3.2544639,11.6746702 C3.26907199,11.6907721 3.28437331,11.7062312 3.30032452,11.7210037 L10.4403903,18.333467 C10.7442966,18.6149166 11.2188212,18.596712 11.5002708,18.2928057 C11.628669,18.1541628 11.6999999,17.9721616 11.6999999,17.7831961 L11.6999999,13.5 C13.6531249,13.5537109 15.0443703,13.6779456 16.3083984,14.0800781 C18.1284272,14.6590944 19.5349747,16.3018455 20.5280411,19.0083314 L20.5280247,19.0083374 C20.6363903,19.3036749 20.9175496,19.5 21.2321404,19.5 L21.4499999,19.5 C21.4499999,19.0068359 21.4451171,18.2255859 21.4451171,17.7910156 Z" transform="translate(12.254964, 11.721538) scale(-1, 1) translate(-12.254964, -11.721538) " fill="currentColor"/></svg></span>';
      linkButton.style.marginRight = "5px"; // Add some margin to the button

      // Assign an event to the button
      linkButton.addEventListener("click", function () {
        window.open(
          `https://chat.openai.com/?prompt=${encodeURIComponent(text)}`
          //   &model=gpt-4
        );
      });

      // Insert the link before the existing button
      clipButton.parentNode.insertBefore(linkButton, clipButton);

      // Adjust the card title width
      let cardTitle = document.querySelector(".card-title");
      if (cardTitle) {
        cardTitle.style.width = "90%";
      }
    }
  } else if (window.location.host === "chat.openai.com") {
    let oldUrl = "";
    let initialized = false; // Variable to track whether we've initialized the textarea's value

    // Check for changes every 500ms
    setInterval(function () {
      if (window.location.href !== oldUrl || !initialized) {
        oldUrl = window.location.href;
        let urlParams = new URLSearchParams(window.location.search);
        let prompt = urlParams.get("prompt");
        let textarea = document.getElementById("prompt-textarea");
        if (prompt && textarea) {
          setTimeout(function () {
            textarea.value = prompt;
            // Trigger input event
            let event = new Event("input", {
              bubbles: true,
              cancelable: true,
            });
            textarea.dispatchEvent(event);
          }, 1500);
          initialized = true; // We've initialized the textarea's value, so we won't change it again until the URL changes
        }
      }
    }, 500);
  }
};
