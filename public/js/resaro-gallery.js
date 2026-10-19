(function () {
    var script = document.currentScript;
    var labels = {
        close: script.dataset.close || 'Close',
        prev: script.dataset.prev || 'Previous photo',
        next: script.dataset.next || 'Next photo'
    };
    var photos = document.querySelectorAll('.resaro-photo');
    if (!photos.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'resaro-lightbox';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
        '<button type="button" class="resaro-lightbox-close" aria-label="' + labels.close + '">&times;</button>' +
        '<button type="button" class="resaro-lightbox-nav resaro-lightbox-prev" aria-label="' + labels.prev + '">&#8249;</button>' +
        '<img class="resaro-lightbox-img" alt="">' +
        '<button type="button" class="resaro-lightbox-nav resaro-lightbox-next" aria-label="' + labels.next + '">&#8250;</button>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.resaro-lightbox-img');
    var closeBtn = overlay.querySelector('.resaro-lightbox-close');
    var items = [];
    var index = 0;
    var opener = null;

    function show(i) {
        index = (i + items.length) % items.length;
        imgEl.src = items[index].src;
        imgEl.alt = items[index].alt;
    }

    function open(button) {
        var main = button.querySelector('img');
        items = [
            { src: main.getAttribute('src'), alt: main.alt },
            { src: button.dataset.extraSrc, alt: button.dataset.extraAlt }
        ];
        opener = button;
        show(0);
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close() {
        overlay.hidden = true;
        document.body.style.overflow = '';
        if (opener) opener.focus();
    }

    photos.forEach(function (button) {
        button.addEventListener('click', function () { open(button); });
    });
    closeBtn.addEventListener('click', close);
    overlay.querySelector('.resaro-lightbox-prev').addEventListener('click', function () { show(index - 1); });
    overlay.querySelector('.resaro-lightbox-next').addEventListener('click', function () { show(index + 1); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
        if (overlay.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(index - 1);
        else if (e.key === 'ArrowRight') show(index + 1);
    });
}());
