<script>
    const hambuurger = document.querySelector('.hamburger');
    const table = document.querySelector('.table');

    hambuurger.addEventListener('click', () => {
        table.classList.toggle('active');
    })
</script>