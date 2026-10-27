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
    var beforeDate = dialog.querySelector('.js-before-date');
    var afterDate = dialog.querySelector('.js-after-date');
    var stageList = dialog.querySelector('.resaro-stage-list');
    var opener = null;

    function showStage(stage, button) {
        before.src = stage.before;
        before.alt = stage.beforeAlt;
        before.classList.toggle('is-contained', stage.beforeFit === 'contain');
        after.src = stage.after;
        after.alt = stage.afterAlt;
        after.classList.toggle('is-contained', stage.afterFit === 'contain');
        beforeDate.textContent = stage.beforeDate;
        afterDate.textContent = stage.afterDate;
        range.value = 50;
        range.dispatchEvent(new Event('input'));
        stageList.querySelectorAll('button').forEach(function (stageButton) {
            var selected = stageButton === button;
            stageButton.classList.toggle('is-active', selected);
            stageButton.setAttribute('aria-pressed', String(selected));
        });
    }

    document.querySelectorAll('.resaro-view').forEach(function (button) {
        button.addEventListener('click', function () {
            var d = button.dataset;
            opener = button;
            title.textContent = d.title;
            stageList.replaceChildren();
            var stages = d.stages ? JSON.parse(d.stages) : [{
                label: d.beforeDate + ' → ' + d.afterDate,
                before: d.before,
                after: d.after,
                beforeDate: d.beforeDate,
                afterDate: d.afterDate,
                beforeAlt: d.beforeAlt,
                afterAlt: d.afterAlt
            }];
            if (stages.length > 1) {
                stages.forEach(function (stage) {
                    var stageButton = document.createElement('button');
                    stageButton.type = 'button';
                    stageButton.textContent = stage.label;
                    stageButton.addEventListener('click', function () { showStage(stage, stageButton); });
                    stageList.appendChild(stageButton);
                });
            }
            showStage(stages[0], stageList.querySelector('button'));
            dialog.showModal();
            range.focus();
        });
    });

    dialog.querySelector('.resaro-dialog-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (opener) opener.focus(); });
}());
