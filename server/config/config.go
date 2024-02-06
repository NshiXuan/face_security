package config

type Config struct {
	Mysql  Mysql  `json:"mysql,omitempty"`
	Server Server `json:"server,omitempty"`
}

type Mysql struct {
	User     string `json:"user,omitempty"`
	Password string `json:"password,omitempty"`
	Host     string `json:"host,omitempty"`
	Port     int    `json:"port,omitempty"`
	Database string `json:"database,omitempty"`
}

type Server struct {
	Port int `json:"port,omitempty"`
}
