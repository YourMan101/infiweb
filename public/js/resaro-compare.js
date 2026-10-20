(function () {
    document.querySelectorAll('.resaro-compare').forEach(function (box) {
        var range = box.querySelector('.resaro-compare-range');
        function update() { box.style.setProperty('--pos', range.value + '%'); }
        range.addEventListener('input', update);
        update();
    });
}());
