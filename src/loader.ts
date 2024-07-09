const createLoader = (): HTMLElement => {
    const skContainer = document.createElement('div');
    skContainer.className = 'sk-container';

    const skCubeGrid = document.createElement('div');
    skCubeGrid.className = 'sk-cube-grid';

    for (let i = 1; i <= 9; i++) {
        const skCube = document.createElement('div');
        skCube.className = `sk-cube sk-cube${i}`;
        skCubeGrid.appendChild(skCube);
    }

    skContainer.appendChild(skCubeGrid);
    return skContainer;
};

export const showLoader = (): void => {
    if (!document.querySelector('.sk-container')) {
        document.body.appendChild(createLoader());
    }
};

export const hideLoader = (): void => {
    const loader = document.querySelector('.sk-container');
    if (loader) {
        loader.remove();
    }
};