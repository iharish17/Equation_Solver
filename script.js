const inputsArea = document.getElementById('inputs-area');
    function renderInputs() {
      let mode = document.getElementById('mode').value;
      let html = '';
      if (mode === '2') {
        html += `<div class="equation-row">
          <label>Equation 1: <em>ax + by = c</em></label>
          <div class="inputs-row">
            <input id="a1" type="number" step="any" placeholder="a">
            <span>x +</span>
            <input id="b1" type="number" step="any" placeholder="b">
            <span>y =</span>
            <input id="c1" type="number" step="any" placeholder="c">
          </div>
        </div>`;
        html += `<div class="equation-row">
          <label>Equation 2: <em>dx + ey = f</em></label>
          <div class="inputs-row">
            <input id="a2" type="number" step="any" placeholder="d">
            <span>x +</span>
            <input id="b2" type="number" step="any" placeholder="e">
            <span>y =</span>
            <input id="c2" type="number" step="any" placeholder="f">
          </div>
        </div>`;
      } else {
        html += `<div class="equation-row">
          <label>Equation 1: <em>a₁x + b₁y + c₁z = d₁</em></label>
          <div class="inputs-row">
            <input id="a1" type="number" step="any" placeholder="a₁">
            <span>x +</span>
            <input id="b1" type="number" step="any" placeholder="b₁">
            <span>y +</span>
            <input id="c1" type="number" step="any" placeholder="c₁">
            <span>z =</span>
            <input id="d1" type="number" step="any" placeholder="d₁">
          </div>
        </div>`;
        html += `<div class="equation-row">
          <label>Equation 2: <em>a₂x + b₂y + c₂z = d₂</em></label>
          <div class="inputs-row">
            <input id="a2" type="number" step="any" placeholder="a₂">
            <span>x +</span>
            <input id="b2" type="number" step="any" placeholder="b₂">
            <span>y +</span>
            <input id="c2" type="number" step="any" placeholder="c₂">
            <span>z =</span>
            <input id="d2" type="number" step="any" placeholder="d₂">
          </div>
        </div>`;
        html += `<div class="equation-row">
          <label>Equation 3: <em>a₃x + b₃y + c₃z = d₃</em></label>
          <div class="inputs-row">
            <input id="a3" type="number" step="any" placeholder="a₃">
            <span>x +</span>
            <input id="b3" type="number" step="any" placeholder="b₃">
            <span>y +</span>
            <input id="c3" type="number" step="any" placeholder="c₃">
            <span>z =</span>
            <input id="d3" type="number" step="any" placeholder="d₃">
          </div>
        </div>`;
      }
      inputsArea.innerHTML = html;
      document.getElementById('result').innerHTML = '';
    }
    renderInputs();

    function solveSystem() {
      let mode = document.getElementById('mode').value;
      let resultEl = document.getElementById('result');
      let modalAns = document.getElementById('modalAns');
      let modal = document.getElementById('modal');

      if (mode === '2') {
        let a1 = parseFloat(document.getElementById("a1").value);
        let b1 = parseFloat(document.getElementById("b1").value);
        let c1 = parseFloat(document.getElementById("c1").value);
        let a2 = parseFloat(document.getElementById("a2").value);
        let b2 = parseFloat(document.getElementById("b2").value);
        let c2 = parseFloat(document.getElementById("c2").value);

        if ([a1, b1, c1, a2, b2, c2].some(v => isNaN(v))) {
          resultEl.textContent = "Please fill all fields with numbers.";
          modalAns.textContent = "Please fill all fields with numbers.";
          showModal();
          return;
        }

        let det = a1 * b2 - a2 * b1;
        if (det === 0) {
          resultEl.textContent = "No unique solution exists.";
          modalAns.textContent = "No unique solution exists.";
          showModal();
          return;
        }

        let x = (c1 * b2 - c2 * b1) / det;
        let y = (a1 * c2 - a2 * c1) / det;
        let sol = `x = ${x.toPrecision(6)}, y = ${y.toPrecision(6)}`;
        resultEl.innerHTML = `<strong>Solution:</strong> ${sol}`;
        modalAns.innerHTML = `<strong>Solution:</strong><br>${sol}`;
        showModal();

      } else {
        let a1 = parseFloat(document.getElementById("a1").value);
        let b1 = parseFloat(document.getElementById("b1").value);
        let c1 = parseFloat(document.getElementById("c1").value);
        let d1 = parseFloat(document.getElementById("d1").value);

        let a2 = parseFloat(document.getElementById("a2").value);
        let b2 = parseFloat(document.getElementById("b2").value);
        let c2 = parseFloat(document.getElementById("c2").value);
        let d2 = parseFloat(document.getElementById("d2").value);

        let a3 = parseFloat(document.getElementById("a3").value);
        let b3 = parseFloat(document.getElementById("b3").value);
        let c3 = parseFloat(document.getElementById("c3").value);
        let d3 = parseFloat(document.getElementById("d3").value);

        if ([a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3].some(v => isNaN(v))) {
          resultEl.textContent = "Please fill all fields with numbers.";
          modalAns.textContent = "Please fill all fields with numbers.";
          showModal();
          return;
        }

        function det3(m) {
          return (
            m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
            m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
            m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
          );
        }
        let d = [
          [a1, b1, c1],
          [a2, b2, c2],
          [a3, b3, c3],
        ];
        let dx = [
          [d1, b1, c1],
          [d2, b2, c2],
          [d3, b3, c3],
        ];
        let dy = [
          [a1, d1, c1],
          [a2, d2, c2],
          [a3, d3, c3],
        ];
        let dz = [
          [a1, b1, d1],
          [a2, b2, d2],
          [a3, b3, d3],
        ];
        let D = det3(d);
        let Dx = det3(dx);
        let Dy = det3(dy);
        let Dz = det3(dz);

        if (D === 0) {
          resultEl.textContent = "No unique solution exists.";
          modalAns.textContent = "No unique solution exists.";
          showModal();
          return;
        }

        let x = Dx / D,
          y = Dy / D,
          z = Dz / D;
        let sol = `x = ${x.toPrecision(6)}, y = ${y.toPrecision(6)}, z = ${z.toPrecision(6)}`;
        resultEl.innerHTML = `<strong>Solution:</strong> ${sol}`;
        modalAns.innerHTML = `<strong>Solution:</strong><br>${sol}`;
        showModal();
      }
    }

    function showModal() {
      document.getElementById('modal').style.display = 'flex';
    }

    function closeModal() {
      document.getElementById('modal').style.display = 'none';
    }