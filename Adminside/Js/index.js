displayData();

// For Insert Data

document.getElementById("addbtn").addEventListener("click", () => {
    const mainformobj = document.mainform;
    let name = mainformobj.proName.value;
    let hide = mainformobj.hid.value;
    let data99 = {};
    let getData = JSON.parse(localStorage.getItem("lsData"));
    let idData = {
        id: 1,
        itemName: name,
    };

    if (getData != null) {
        if (hide != "") {
            for (let i = 0; i < getData.Item.length; i++) {
                if (hide == getData.Item[i].id) {
                    getData.Item[i].itemName = name;
                }
            }
            localStorage.setItem("lsData", JSON.stringify(getData));
            document.getElementById("hid").value = '';
        } else {
            let nline = getData.Item.length;
            idData = {
                id: nline + 1,
                itemName: name,
            };
            getData.Item.push(idData);
            data99 = getData;
            localStorage.setItem("lsData", JSON.stringify(data99));
        }
    } else {
        data99.Item = [idData];
        localStorage.setItem("lsData", JSON.stringify(data99));
    }
    document.mainform.reset();
    displayData();
});

// For Display Data

function displayData() {
    let din = "";
    let infod = JSON.parse(localStorage.getItem("lsData"));
    if (infod != null && infod.Item.length > 0) {
        din += "<tr>";
        din += "<th>Id</th>";
        din += "<th>Category</th>";
        din += "<th colspan = '2'>Action</th>";
        din += "</tr>";

        for (let i = 0; i < infod.Item.length; i++) {
            din += "<tr>";
            din += "<td>" + infod.Item[i].id + "</td>";
            din += "<td>" + infod.Item[i].itemName + "</td>";
            din +=
                "<td><input type='button' name='editbtn' value='Edit' onclick='editData(" +
                infod.Item[i].id +
                ")'>";
            din +=
                " <input type='button' name='delbtn' value='Delete' onclick='delData(" +
                infod.Item[i].id +
                ")'></td>";
            din += "</tr>";
        }
    }
    document.getElementById("dtab").innerHTML = din;
}

// For delete data

function delData(id) {
    let infod = JSON.parse(localStorage.getItem("lsData"));
    if (infod != null && infod.Item.length > 0) {
        let k1 = id - 1;
        infod.Item.splice(k1, 1);
        let j = 1;
        for (let i = 0; i < infod.Item.length; i++) {
            infod.Item[i].id = j;
            j++;
        }
        localStorage.setItem("lsData", JSON.stringify(infod));
        displayData();
    }
}

// For Update Data

function editData(id) {
    let infod = JSON.parse(localStorage.getItem("lsData"));
    if (infod != null) {
        for (let i = 0; i < infod.Item.length; i++) {
            if (id == infod.Item[i].id) {
                document.mainform.proName.value = infod.Item[i].itemName;
                document.mainform.hid.value = infod.Item[i].id;
            }
        }
    }
}