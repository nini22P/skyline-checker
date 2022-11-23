const data_url = "https://skyline-builds.alula.gay/builds";
const download_url = "https://skyline-builds.alula.gay/cache/"
const commit_url = "https://github.com/skyline-emu/skyline/commit/"

loadUrl(data_url).then((data) => {
    insert(data);
});

async function loadUrl(data_url) {
    const response = await fetch(data_url);
    return data = await response.json();
}

function insert(data) {
    const skylines = document.getElementById("skylines");
    const t = document.querySelector("#temp");
    const createdAt = t.content.querySelector(".createdAt")
    const number = t.content.querySelector(".number");
    const download = t.content.querySelector(".download");
    const commit = t.content.querySelector(".commit");
    for (let i = 0; i < data.length; i++) {
        createdAt.textContent = new Date(data[i].createdAt).toLocaleString();
        number.textContent = "#" + data[i].runNumber;
        download.href = download_url + data[i].id + "/" + data[i].apkName;
        commit.href = commit_url + "/" + data[i].commit.id;
        let clone = document.importNode(t.content, true)
        skylines.appendChild(clone);
    }

}
