import jwt from "jsonwebtoken";

export const refreshToken = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensaje: "Token faltante" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const newToken = jwt.sign(
            { UsuarioId: decoded.UsuarioId, Rol: decoded.Rol },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.json({ newToken });
    } catch (error) {
        res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
};
