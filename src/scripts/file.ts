function displayTotalPerPerson(person: string, total: number) {
    const message: string = "Total for " + person + " is " + total;
    document.getElementById("totalMessage").textContent = message;
}
