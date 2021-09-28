console.log("Wel-Come to Youtube video Downloader");

let web_link = "http://localhost:3000/api/link?ViLink="
let video_link;

let LinkBar = document.querySelector("#Userlink")
let SearchButton = document.querySelector("#SearchButton")
let spinner = document.querySelector("#spinnerBox")

function changeLink() {
    video_link = web_link + LinkBar.value
    fetch_link()
}

LinkBar.addEventListener("onblur", function(params) {
    changeLink()
})
SearchButton.addEventListener("click", function(params) {
    params.preventDefault()
    changeLink()
})


function fetch_link() {
    spinner.classList.remove("displayNone")

    fetch(video_link).then(function(res) {
        return res.json()
    }).then(function(info) {
        let repel = document.querySelector("#repel")

        // sorting all video 
        let allVideoInfo = info.formats
        let downHtml
        allVideoInfo.map(sorterVideo)

        function sorterVideo(params) {
            let nHtml = `<tr>
                            <td> <a class="dLink" href="${params.url}" target="_blank"> Download </a> </td>
                            <td> ${(!(params.qualityLabel === null) ? params.qualityLabel : params.quality)} </td>
                            <td> ${params.hasVideo} </td>
                            <td> ${params.hasAudio} </td>
                            <td> ${params.container} </td>
                        </tr>`

            downHtml += nHtml
        }

        console.log(allVideoInfo);

        // Displaying Result

        let html = `<div class="info">
                        <div class="tham">
                            <img class="img" src="${info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url}" alt="image Error">
                        </div>
                        <div class="title">${info.videoDetails.title}</div>
                            <div class="dBox">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>link</th>
                                            <th>Quality</th>
                                            <th>Has Video</th>
                                            <th>Has Audio</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${downHtml}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `

        repel.innerHTML = html

        spinner.classList.add("displayNone")
    })

}