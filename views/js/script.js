document.querySelector('#download').addEventListener('click', () => {
    document.querySelector('#alert').style.display = 'block';
    document.querySelector('#alert').innerText = 'Please wait a while! Loading ..............';
    const host = window.location;
    const videoURL = document.querySelector('#link').value.trim();
    if(videoURL.length == 0){
        alert("Please Enter a Valid YouTube Short Video Link");
    }

    fetch(host + 'videoInfo?videoURL=' + videoURL).then(response => {
        return response.json();
    }).then(data => {
        document.querySelector('#link').value = '';
        const result = {
            thumbnail: document.querySelector('.thumbnail img'),
            fileFormats: document.querySelector('#file-formats'),
        };

        let files = '';

        let videos = data.formats.filter(format => {
            return format.mimeType.includes("video/mp4") && !format.mimeType.includes("mp4a");
        });
        let audios = data.formats.filter(format => {
            return format.mimeType.includes("audio/mp4") || format.mimeType.includes("audio/webm");
        });
        let av = data.formats.filter(format => {
            return format.mimeType.includes("video/mp4") && format.mimeType.includes("mp4a");
        });

        console.log(videos, audios, av);
        console.log(data.formats
            )

        av.forEach(auvi => {
            let fileGroup = `<div class='file-group'><div class="files">Video + Audio (${auvi.qualityLabel})</div><button class="buttons"><a href='download?videoURL=${videoURL}&itag=${auvi.itag}&format=mp4'>Download</a></button></div>`;
            files += fileGroup;
        });
        
        videos.forEach(video => {
            let fileGroup = `<div class='file-group'><div class="files">Video (${video.qualityLabel})</div><button class="buttons"><a href='download?videoURL=${videoURL}&itag=${video.itag}&format=mp4'>Download</a></button></div>`;
            files += fileGroup;
        });

        audios.forEach(audio => {
            let fileGroup = `<div class='file-group'><div class="files">Audio (${audio.audioBitrate} Bits)</div><button class="buttons"><a href='download?videoURL=${videoURL}&itag=${audio.itag}&format=mp3'>Download</a></button></div>`;
            files += fileGroup;
        });

        result.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url;
        result.fileFormats.innerHTML = files;

        document.querySelector('#alert').style.display = 'none';
        document.querySelector('.result').style.display = "block";
        document.querySelector('.result').scrollIntoView({
            behavior: "smooth",
        });

    }).catch(error => {
        alert(error);
    });
});