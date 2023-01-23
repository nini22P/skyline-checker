const default_lang_url = "lang/en-US.json";
const lang_url = "lang/" + navigator.language.toString() + ".json";
const data_url = "https://skyline-builds.alula.gay/builds";
const download_url = "https://skyline-builds.alula.gay/cache/"
const commit_url = "https://github.com/skyline-emu/skyline/commit/"

loadLang(lang_url).then((lang_data) => {
    setLang(lang_data);
    loadUrl(data_url).then((data) => {
        insert(lang_data, data);
        document.getElementById("loading").style.display = "none";
    });
});

async function loadUrl(data_url) {
    const response = await fetch(data_url);
    return data = await response.json();
}

async function loadLang(lang_url) {
    try {
        return getLang(lang_url);
    } catch (error) {
        return getLang(default_lang_url);
    }
}

function getLang(lang_url) {
    const request = new XMLHttpRequest();
    request.open("GET", lang_url, false);
    request.send("");
    return JSON.parse(request.response);
}

function setLang(lang_data) {
    document.getElementById("loading").textContent = lang_data.loading;
    document.getElementById("note").innerHTML = lang_data.note;
}

function insert(lang_data, data) {
    const skylines = document.getElementById("skylines");
    const t = document.querySelector("#temp");
    const createdAt = t.content.querySelector(".createdAt")
    const number = t.content.querySelector(".number");
    const branch = t.content.querySelector(".branch");
    const download = t.content.querySelector(".download");
    const commit = t.content.querySelector(".commit");
    const message = t.content.querySelector(".message");
    for (let i = 0; i < data.length; i++) {
        createdAt.textContent = new Date(data[i].createdAt).toLocaleString();
        number.textContent = "#" + data[i].runNumber;
        branch.textContent = lang_data.branch + ": " + data[i].branch;
        download.textContent = lang_data.download;
        download.href = download_url + data[i].id + "/" + data[i].apkName;
        commit.href = commit_url + "/" + data[i].commit.id;
        message.textContent = data[i].commit.message.substring(0, data[i].commit.message.indexOf("\n\n") + 1) ? data[i].commit.message.substring(0, data[i].commit.message.indexOf("\n\n") + 1) : data[i].commit.message;
        let clone = document.importNode(t.content, true)
        skylines.appendChild(clone);
    }

}