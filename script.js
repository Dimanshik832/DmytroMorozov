document.addEventListener('DOMContentLoaded', () => {
    const elementsContainer = document.getElementById('elements-container');
    const form = document.getElementById('add-element-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    function loadElements() {
        const elements = localStorage.getItem('elements');
        return elements ? JSON.parse(elements) : [];
    }

    function saveElements(elements) {
        localStorage.setItem('elements', JSON.stringify(elements));
    }

    function createElement(elementData, index) {
        const element = document.createElement('div');
        element.className = `element ${elementData.expanded ? 'expanded' : ''}`;
        
        const title = document.createElement('div');
        title.textContent = elementData.title;
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
            element.classList.toggle('expanded');
            elementData.expanded = !elementData.expanded;
            saveElements(loadElements());
        });

        const content = document.createElement('div');
        content.className = 'content';
        content.textContent = elementData.description;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edytuj';
        editButton.addEventListener('click', () => editElement(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Usuń';
        deleteButton.addEventListener('click', () => deleteElement(index));

        element.appendChild(title);
        element.appendChild(content);
        element.appendChild(editButton);
        element.appendChild(deleteButton);
        elementsContainer.appendChild(element);
    }

    function renderElements() {
        elementsContainer.innerHTML = '';
        const elements = loadElements();
        elements.forEach((elementData, index) => {
            createElement(elementData, index);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newElement = {
            title: titleInput.value,
            description: descriptionInput.value,
            expanded: false
        };
        const elements = loadElements();
        elements.push(newElement);
        saveElements(elements);
        renderElements();
        titleInput.value = '';
        descriptionInput.value = '';
    });

    function editElement(index) {
        const elements = loadElements();
        const elementData = elements[index];
        const newTitle = prompt('Nowy tytuł:', elementData.title);
        const newDescription = prompt('Nowy opis:', elementData.description);
        if (newTitle !== null) elementData.title = newTitle;
        if (newDescription !== null) elementData.description = newDescription;
        saveElements(elements);
        renderElements();
    }

    function deleteElement(index) {
        const elements = loadElements();
        elements.splice(index, 1);
        saveElements(elements);
        renderElements();
    }

    if (!localStorage.getItem('elements')) {
        const defaultElements = [
            { title: 'Element 1', description: 'Opis 1', expanded: false },
            { title: 'Element 2', description: 'Opis 2', expanded: false },
            { title: 'Element 3', description: 'Opis 3', expanded: false },
            { title: 'Element 4', description: 'Opis 4', expanded: false },
            { title: 'Element 5', description: 'Opis 5', expanded: false }
        ];
        saveElements(defaultElements);
    }

    renderElements();
});
