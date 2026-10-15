const projectGalleryFigures = document.querySelectorAll('.project-story-media figure');

if (projectGalleryFigures.length && typeof HTMLDialogElement !== 'undefined') {
    const isSwedish = document.documentElement.lang.startsWith('sv');
    const dialog = document.createElement('dialog');
    const closeButton = document.createElement('button');
    const image = document.createElement('img');
    const caption = document.createElement('p');

    dialog.className = 'project-lightbox';
    dialog.setAttribute('aria-label', isSwedish ? 'Förstorad projektbild' : 'Enlarged project photo');

    closeButton.className = 'project-lightbox-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', isSwedish ? 'Stäng bildvisaren' : 'Close enlarged image');
    closeButton.textContent = '×';

    image.className = 'project-lightbox-image';
    caption.className = 'project-lightbox-caption';
    dialog.append(closeButton, image, caption);
    document.body.append(dialog);

    projectGalleryFigures.forEach(figure => {
        const thumbnail = figure.querySelector('img');
        const figureCaption = figure.querySelector('figcaption');
        const button = document.createElement('button');

        button.className = 'project-image-button';
        button.type = 'button';
        button.setAttribute(
            'aria-label',
            `${isSwedish ? 'Förstora bild' : 'Enlarge photo'}: ${figureCaption?.textContent.trim() || thumbnail.alt}`
        );
        thumbnail.parentNode.insertBefore(button, thumbnail);
        button.append(thumbnail);

        button.addEventListener('click', () => {
            image.src = thumbnail.currentSrc || thumbnail.src;
            image.alt = thumbnail.alt;
            caption.textContent = figureCaption?.textContent.trim() || thumbnail.alt;
            dialog.showModal();
        });
    });

    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            event.preventDefault();
            dialog.close();
        }
    });
    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}
