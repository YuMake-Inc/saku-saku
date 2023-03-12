window.onload =function(){
    //出力場所を探す
    let output =document.getElementById("output");
    //CSVの指定
    getCsv('https://rawcdn.githack.com/YuMake-Inc/saku-saku/main/csvdata/data.csv?token=GHSAT0AAAAAAB7NR7OGT5WHJPH7OX27THPSZANDWEA');
            
    //CSVの取り込み
    function getCsv(data){
        // HTTPでファイルを読み込む
        let xhr = new XMLHttpRequest(); 
        //取得するファイルの設定
        xhr.open("GET",data,true);
        //レスポンスの確認
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {//4は完了
                if (xhr.status === 200) {//Done or load
                //console.log(xhr.responseText);
                let responce = xhr.responseText;
                csvArr(responce);
                } else {
                console.error(xhr.statusText);
                }
            }
        };
       //リクエストの要求送信
       xhr.send(null);
    }

    //CSVを配列に格納 dataArrはレスポンス
    function csvArr(dataArr){
        let arr =[];
        let list = dataArr.split('\n');
        //帰ってきているレスポンスを配列に格納する
        for(let i = 0; i <list.length; i++){
            arr[i] = list[i].split(',');
        }
        //console.log(arr);
        htmlWrite(arr);//出力をtableに設定する
    }

    //出力のタグを設定
    function htmlWrite(dataList){

        // 表示させたいcsvのIDを取得する ?id=1だと1が取得される
        let url = new URL(window.location.href);
        let params = url.searchParams;
        let csvGetId = params.get('id');
        
        let insert ="";

        for(let i = 1;i < dataList.length;i++){

            if(dataList[i][0].toString() == csvGetId.toString()){
                let imgURL = dataList[i][1].toString();
                
                imgURL = imgURL.substring(imgURL.indexOf("(") + 1, imgURL.indexOf(")"));
                
                //ここにhtmlソースコードをinsertにいれる
                insert +='<p>';
                insert += '<img src="' + imgURL +  '">';
                insert +='</p>';

                insert +='<div class="sakuradeta">';
                insert +='<span>' + " 桜が見れる場所の名前 " +'</span>';
                insert +='<p>' + dataList[i][2] +'</p>';
                insert +='<span>' + " 概要 " +'</span>';
                insert +='<p>' + dataList[i][5] +'</p>';
                insert +='<span>' + " 例年の見頃 " +'</span>';
                insert +='<p>' + dataList[i][6] +'</p>';
                insert +='<span>' + " 近隣駐車場の有無 " +'</span>';
                insert +='<p>' + dataList[i][7] +'</p>';
                insert +='<span>' + " 駐車料金 " +'</span>';
                insert +='<p>' + dataList[i][8] +'</p>';
                insert +='<span>' + " 最寄り駅 " +'</span>';
                insert +='<p>' + dataList[i][9] +'</p>';
                insert +='<span>' + " 桜が見れる時間（開園閉園時間） " +'</span>';
                insert +='<p>' + dataList[i][10] +'</p>';
                insert +='</div>';

            }
        }
     
        //HTMLに出力
        output.innerHTML = insert;
    }
}