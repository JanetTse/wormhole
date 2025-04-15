/// ALL TEXT ON SCREEN ///
function scoreUI(){
    push();
    textSize(24);
    textAlign(LEFT);
    text(`Score: ${score}`, 100, 100);
    pop();
}