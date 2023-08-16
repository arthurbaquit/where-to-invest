package handler

import (
	"github.com/arthurbaquit/where-to-invest/models"
	. "github.com/arthurbaquit/where-to-invest/repositories"
	"github.com/gin-gonic/gin"
)

type AtivosHandler struct {
	ativosRepo IAtivosRepository
}

type Config struct {
	AtivosRepo IAtivosRepository
	R          *gin.Engine
}

func ApiHandler(c *Config) {
	handler := &AtivosHandler{
		ativosRepo: c.AtivosRepo,
	}

	group := c.R.Group("/api/ativos")
	{
		group.GET("/", handler.GetAll)
		group.GET("/:filter", handler.GetByType)
		group.POST("/save", handler.SaveAtivo)
		group.DELETE("/delete/:id", handler.DeleteAtivo)
	}
}

func (h *AtivosHandler) GetAll(c *gin.Context) {
	ativos, err := h.ativosRepo.GetAll()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, ativos)
}

func (h *AtivosHandler) GetByType(c *gin.Context) {
	filter := c.Param("filter")
	ativos, err := h.ativosRepo.GetByType(filter)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, ativos)
}

func (h *AtivosHandler) SaveAtivo(c *gin.Context) {
	var ativo models.Ativos
	err := c.ShouldBindJSON(&ativo)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.ativosRepo.Update(&ativo)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, ativo)
}

func (h *AtivosHandler) DeleteAtivo(c *gin.Context) {
	id := c.Param("id")
	err := h.ativosRepo.Delete(id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Ativo deleted"})
}
