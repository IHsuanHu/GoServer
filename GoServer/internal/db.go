package db

import (
	"database/sql"
	"fmt"
	"log"
	"urlshortener/internal/util"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost" //"host.docker.internal" //
	port     = 5432
	user     = "urluser"
	password = "0000"
	dbname   = "urlserver"
)

type Url struct {
	ShortUrl    string
	OriginalUrl string
}

var db *sql.DB

// connect to database with specific user
func init() {
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalf("Error pring database: %v", err)
	}
	if err = InitDB(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}
	log.Printf("Database initialize successfully")
}

func InitDB() error {
	return CreateTables()
}

func CreateTables() error {
	query := `
    CREATE TABLE IF NOT EXISTS url (
		short_url VARCHAR(7) PRIMARY KEY,
        original_url TEXT NOT NULL
    );`
	_, err := db.Exec(query)
	if err != nil {
		log.Printf("Error creating database table: %s", err)
		return err
	}
	log.Println("Table created successfully or already exists.")
	return nil

}

func Close() {
	if db != nil {
		db.Close()
	}
}

// Create new data to database
func GenerateUrl(originalUrl string) (string, error) {
	existingShortUrl, err := FindShortUrl(originalUrl)
	if existingShortUrl != "" && err == nil {
		log.Printf("Original URL already exists, returning existing short URL: %s", existingShortUrl)
		return existingShortUrl, nil
	}
	shortUrl := util.GenerateBase62(7)
	for {
		query := `insert into url (short_url, original_url)
			values ($1, $2) returning short_url`
		err := db.QueryRow(query, shortUrl, originalUrl).Scan(&shortUrl)
		if err != nil {
			pgErr, ok := err.(*pq.Error)
			if ok && pgErr.Code == "23505" {
				shortUrl = util.GenerateBase62(7)
				continue
			}
			return "", err
		}
		break
	}
	log.Printf(`Insert %s sucessfully`, shortUrl)
	return shortUrl, nil
}

// giving a hash value then return original url
func FindShortUrl(originalUrl string) (string, error) {
	query := `select short_url from url where original_url = $1`
	var Shorturl string
	err := db.QueryRow(query, originalUrl).Scan(&Shorturl)
	if err == sql.ErrNoRows {
		return "", fmt.Errorf("no short URL found fot the given URL")
	} else if err != nil {
		return "", err
	}
	return Shorturl, nil
}

// check the original url to reduce duplicate
func FindOriginalUrl(shortUrl string) (string, error) {
	query := `select original_url from url where short_url = $1`
	var originalUrl string
	err := db.QueryRow(query, shortUrl).Scan(&originalUrl)
	if err == sql.ErrNoRows {
		return "", fmt.Errorf("no original URL found for the given short URL")
	} else if err != nil {
		return "", err
	}
	return originalUrl, nil
}
