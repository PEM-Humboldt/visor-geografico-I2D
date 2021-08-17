function buildTableBody(data, columns,title) {
    let body = [],dataTitle = [];

    columns.forEach(function(column) {
        dataTitle.push({text: title[column].toString(), bold: true, alignment:'center'});
    })
    body.push(dataTitle);

    // data info
    data.forEach(function(row) {
        let dataRow = [];

        columns.forEach(function(column) {
            dataRow.push({text:row[column].toString(), alignment:'center'});
        })

        body.push(dataRow);
    });

    return body;
}

// function buildWidth(data) {
//     let dataRow = []
//     data.forEach(function(row) {
//         dataRow.push(70)
//     })
//     console.log(data.length,dataRow)
//     return dataRow
// }

// table config
export function table(data, columns,title) {
    return {

        columns: [
            { width: '*', text: '' },
            {
                width: 'auto',
                table: {
                    headerRows: 1,
                    body: buildTableBody(data, columns,title),
                    // widths: buildWidth(data),
                    alignment: "center"
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 0.5;
                    },
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                    hLineColor: function (i, node) {
                        return 'black';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#e1e1ed' : null;
                    }
                },
                margin: [50, 0, 50, 20]
            },
            { width: '*', text: '' },
            
        ],
        styles: {
            tableHeader:{
                bold: true,
                alignment: 'center'
            }
        }
    };
}