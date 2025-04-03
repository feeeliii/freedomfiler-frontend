import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "../common/Button2";

function LoginZwei() {
    const navigate = useNavigate(); // Hook für die Navigation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handler für Login-Formular
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Einfache Validierung
        if (!email || !password) {
            setError("Bitte E-Mail und Passwort eingeben");
            return;
        }
        
        try {
            setError("");
            setLoading(true);
            
            // Hier API-Aufruf zum Backend erfolgen
            console.log("Login-Versuch mit:", { email, password });
            
            // Simuliere erfolgreichen Login
            // In der echten Implementierung würdest du das Token speichern
            // localStorage.setItem('authToken', response.data.token);
            
            // Weiterleitung zum Dashboard
            navigate("/dashboard");
            
        } catch (err) {
            setError(err.message || "Ein Fehler ist aufgetreten");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-4 relative mt-6">
            {/* Rotes Hintergrundelement */}
            <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[600px] rounded-full bg-[#EC1119] opacity-20 z-0"
                style={{ filter: "blur(150px)" }}
            ></div>

            <div className="flex justify-center relative z-10">
                <div className="bg-white rounded-lg shadow-md 
                                w-[95%] h-[555px]
                                max-w-[500px]
                                overflow-auto ml-5
                                text-center
                                ">
                    <h1 className="font-[Ranchers] text-[#DD2634] leading-tight text-5xl font-bold mb-1">Login</h1>
                    
                    {/* Fehleranzeige */}
                    {error && (
                        <div className="text-red-600 mb-2 mt-2">
                            {error}
                        </div>
                    )}
                    
                    {/* Login-Formular */}
                    <form onSubmit={handleSubmit} className="px-8 pt-4">
                        {/* E-Mail Input */}
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="E-Mail Adresse"
                                required
                            />
                        </div>
                        
                        {/* Passwort Input */}
                        <div className="mb-6">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Passwort"
                                required
                            />
                        </div>
                        
                        {/* Login Button */}
                        <div className="flex justify-center mt-4">
                            <Button 
                                variant="login" 
                                className=""
                                onClick={handleSubmit}
                                type="button"
                            ></Button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="text-center mt-1">con mucho amor por la libertad de informacion</p>
        </div>
    )
}

export default LoginZwei
