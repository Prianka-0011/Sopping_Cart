


   const form = document.getElementById("login");
   form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from being submitted
        fetch('http://localhost:3000/login',{
            method: 'POST',
            body:JSON.stringify({
                username: form.elements["username"].value,
                password:form.elements["password"].value 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        
            .then(data => {
                
                if(data.error){
                    //here is error
                    alert(data.error);
                   // document.getElementById('errorMsg').innerHTML = data.error;
                } else {
                    console.log(data)
                    sessionStorage.setItem('accessToken', data.accessToken);
                    sessionStorage.setItem('userInfo', data.userInfo);
                    // fetchProduct();
                     window.location.href = "product.html";
                  //  console.log(`${sessionStorage.getItem('accessToken')}`);
                    
                }
            })
            
    })

 //}
 //face product
 