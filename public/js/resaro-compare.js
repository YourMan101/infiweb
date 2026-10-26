(function () {
    function bind(box) {
        var range = box.querySelector('.resaro-compare-range');
        function update() { box.style.setProperty('--pos', range.value + '%'); }
        range.addEventListener('input', update);
        update();
    }

    document.querySelectorAll('.resaro-compare').forEach(bind);

    var dialog = document.querySelector('.resaro-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    var range = dialog.querySelector('.resaro-compare-range');
    var title = dialog.querySelector('#resaro-dialog-title');
    var before = dialog.querySelector('.js-before');
    var after = dialog.querySelector('.js-after');
    var opener = null;

    document.querySelectorAll('.resaro-view').forEach(function (button) {
        button.addEventListener('click', function () {
            var d = button.dataset;
            opener = button;
            title.textContent = d.title;
            before.src = d.before;
            before.alt = d.beforeAlt;
            after.src = d.after;
            after.alt = d.afterAlt;
            dialog.querySelector('.js-before-date').textContent = d.beforeDate;
            dialog.querySelector('.js-after-date').textContent = d.afterDate;
            range.value = 50;
            range.dispatchEvent(new Event('input'));
            dialog.showModal();
            range.focus();
        });
    });

    dialog.querySelector('.resaro-dialog-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (opener) opener.focus(); });
}());
