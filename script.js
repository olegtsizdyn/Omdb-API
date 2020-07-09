function qwe (xhr) {
    let search_res = JSON.parse(xhr.response);
    for (let i = 0; i < search_res.Search.length - 2; i++) {
        $('img')[i + 1].src = `${search_res.Search[i].Poster}`;
        $('.name')[i].textContent = `${search_res.Search[i].Title}`;
        $('.type')[i].textContent = `${search_res.Search[i].Type}`;
        $('.year')[i].textContent = `${search_res.Search[i].Year}`;
        $('.more_details')[i].id = `${search_res.Search[i].imdbID}`;
    }
    $('.content_blocks').css("display", "flex");
}

$('#search_button').click(function () {
    if ($('#search_input')[0].value != undefined && $('#search_input')[0].value != '') {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `http://www.omdbapi.com/?s=${$('#search_input')[0].value}&apikey=eeb56d4b`);
            xhr.onload = () => resolve(qwe(xhr));
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
});
$('.more_details').click(function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?i=${this.id}&apikey=eeb56d4b`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('.wrapper').css("display", "none");
            $('.wrapper_modal').css("display", "flex");
            let search_res = JSON.parse(xhr.response);
            $('img')[0].src = search_res.Poster;
            $('.name_from_details')[0].textContent = search_res.Title;
            $('.sci_fi')[0].textContent = `${search_res.Rated} ${search_res.Year} ${search_res.Genre}`;
            $('.description')[0].textContent = search_res.Plot;
            $('.written')[0].innerHTML = `<b>Written by: </b>${search_res.Writer}`;
            $('.directed')[0].innerHTML = `<b>Director by: </b>${search_res.Director}`;
            $('.starring')[0].innerHTML = `<b>Starring: </b>${search_res.Actors}`;
            $('.boxOffice')[0].innerHTML = `<b>BoxOffice: </b>${search_res.BoxOffice}`;
            $('.awards')[0].innerHTML = `<b>Awards: </b>${search_res.Awards}`;
            $('.ratings')[0].innerHTML = `<b>Ratings: </b>`;
            let ratings = search_res.Ratings;
            $('.rating_1')[0].innerHTML = `${ratings[0].Source} ${ratings[0].Value}`;
            $('.rating_2')[0].innerHTML = `${ratings[1].Source} ${ratings[1].Value}`;
            $('.rating_3')[0].innerHTML = `${ratings[2].Source} ${ratings[2].Value}`;
        }
    }
    xhr.send();
});

$('.more_details_modal').click(function () {
    $('.wrapper').css("display", "flex");
    $('.wrapper_modal').css("display", "none");
});